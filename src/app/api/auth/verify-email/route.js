import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response('Invalid verification link', { status: 400 });
    }

    // Find and validate token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return new Response('Invalid or expired verification link', { status: 400 });
    }

    // Update user email
    await prisma.user.update({
      where: {
        email: verificationToken.identifier,
      },
      data: {
        email: verificationToken.newEmail,
        emailVerified: new Date(),
      },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    // Redirect to profile page with success message
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/profile?verified=true',
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return new Response('An error occurred during email verification', { status: 500 });
  }
}
