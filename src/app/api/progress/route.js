import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

// Helper function to create JSON response
function jsonResponse(data, status = 200) {
  try {
    const jsonString = JSON.stringify(data);
    console.log('Response data:', jsonString);
    return new Response(jsonString, {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating JSON response:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Get user's progress
export async function GET(request) {
  console.log('GET /api/progress - Start');
  try {
    const auth = getAuth(request);
    console.log('Auth:', auth);
    const { userId } = auth;

    if (!userId) {
      console.log('No userId found');
      return jsonResponse({ 
        data: [],
        success: false,
        message: 'Unauthorized' 
      }, 401);
    }

    console.log('Fetching progress for userId:', userId);
    const progress = await prisma.progress.findMany({
      where: {
        userId: userId.toString()
      },
      select: {
        id: true,
        projectId: true,
        sectionId: true,
        lessonId: true,
        completed: true,
        startedAt: true,
        updatedAt: true
      }
    });
    console.log('Found progress:', progress);

    return jsonResponse({
      data: progress || [],
      success: true
    });

  } catch (error) {
    console.error('Get progress error:', error);
    return jsonResponse({
      data: [],
      success: false,
      message: 'An error occurred while fetching progress',
      error: error.message
    }, 500);
  }
}

// Check progress
export async function POST(request) {
  console.log('POST /api/progress - Start');
  try {
    const auth = getAuth(request);
    console.log('Auth:', auth);
    const { userId } = auth;

    if (!userId) {
      console.log('No userId found');
      return jsonResponse({
        data: null,
        success: false,
        message: 'Unauthorized'
      }, 401);
    }

    const body = await request.json();
    console.log('Request body:', body);
    const { projectId, sectionId, lessonId } = body;

    if (!projectId || sectionId === undefined || lessonId === undefined) {
      return jsonResponse({
        data: null,
        success: false,
        message: 'Missing required fields'
      }, 400);
    }

    console.log('Checking progress for:', { userId, projectId, sectionId, lessonId });
    const progress = await prisma.progress.findFirst({
      where: {
        userId: userId.toString(),
        projectId,
        sectionId,
        lessonId,
      },
      select: {
        id: true,
        completed: true
      }
    });
    console.log('Found progress:', progress);

    return jsonResponse({
      data: { completed: !!progress?.completed },
      success: true
    });

  } catch (error) {
    console.error('Post progress error:', error);
    return jsonResponse({
      data: null,
      success: false,
      message: 'An error occurred while checking progress',
      error: error.message
    }, 500);
  }
}

// Update progress
export async function PUT(request) {
  console.log('PUT /api/progress - Start');
  try {
    const auth = getAuth(request);
    console.log('Auth:', auth);
    const { userId } = auth;

    if (!userId) {
      console.log('No userId found');
      return jsonResponse({
        data: null,
        success: false,
        message: 'Unauthorized'
      }, 401);
    }

    const body = await request.json();
    console.log('Request body:', body);
    const { projectId, sectionId, lessonId, completed } = body;

    console.log('Updating progress for:', { userId, projectId, sectionId, lessonId, completed });
    const progress = await prisma.progress.upsert({
      where: {
        userId_projectId_sectionId_lessonId: {
          userId: userId.toString(),
          projectId,
          sectionId,
          lessonId,
        },
      },
      update: {
        completed,
        updatedAt: new Date()
      },
      create: {
        userId: userId.toString(),
        projectId,
        sectionId,
        lessonId,
        completed,
      },
      select: {
        id: true,
        completed: true,
        updatedAt: true
      }
    });
    console.log('Updated progress:', progress);

    return jsonResponse({
      data: progress,
      success: true
    });

  } catch (error) {
    console.error('Put progress error:', error);
    return jsonResponse({
      data: null,
      success: false,
      message: 'An error occurred while updating progress',
      error: error.message
    }, 500);
  }
}
