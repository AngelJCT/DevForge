import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Get user's progress
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching progress' },
      { status: 500 }
    );
  }
}

// Update progress
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { projectId, sectionId, lessonId, completed } = await request.json();

    if (!projectId || sectionId === undefined || lessonId === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_projectId_sectionId_lessonId: {
          userId: session.user.id,
          projectId,
          sectionId,
          lessonId,
        },
      },
      update: {
        completed,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        projectId,
        sectionId,
        lessonId,
        completed,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating progress' },
      { status: 500 }
    );
  }
}
