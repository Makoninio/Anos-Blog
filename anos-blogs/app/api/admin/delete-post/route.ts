import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { requireAdmin } from '@/lib/admin-auth';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN, // Only available server-side
  useCdn: false,
});

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Session not found' },
        { status: 401 }
      );
    }

    // Check if token exists
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'SANITY_API_TOKEN is not configured. Please add it to your .env.local file with Editor or Admin permissions. See SANITY_TOKEN_SETUP.md for instructions.' 
        },
        { status: 500 }
      );
    }

    const { postId } = await req.json();
    
    // Validate required fields
    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const result = await client.delete(postId);
    
    return NextResponse.json({ 
      success: true, 
      result: result 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    
    // Provide more helpful error messages
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for permission errors
      if (errorMessage.includes('permission') || errorMessage.includes('Insufficient permissions')) {
        errorMessage = `Permission denied: Your SANITY_API_TOKEN needs "Editor" or "Admin" permissions to delete posts. Current token may have only "Viewer" permissions. Please check your token settings at https://www.sanity.io/manage and ensure it has write access.`;
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
} 
