import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { authOptions } from '../../auth/[...nextauth]/route';
import { sendVerificationEmail } from '@/app/lib/email';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, email, currentPassword, newPassword } = await request.json();

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed
    let emailChangeRequested = false;
    if (email !== user.email) {
      // Check if email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already in use' },
          { status: 400 }
        );
      }

      emailChangeRequested = true;
    }

    // Prepare update data
    const updateData = { name };

    // If email is being changed, create verification token
    if (emailChangeRequested) {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token expires in 24 hours

      // Store the pending email change
      await prisma.verificationToken.create({
        data: {
          identifier: user.email,
          token: verificationToken,
          expires: tokenExpiry,
        },
      });

      // Send verification email
      await sendVerificationEmail(email, verificationToken);
    }

    // Handle password change if requested
    if (newPassword) {
      // Verify current password
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updateData.password = hashedPassword;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    return NextResponse.json({
      message: emailChangeRequested
        ? 'Profile updated. Please check your email to verify the new email address.'
        : 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
      emailPending: emailChangeRequested,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
}
