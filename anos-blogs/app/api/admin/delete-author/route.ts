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

    const { authorId } = await req.json();
    
    // Validate required fields
    if (!authorId) {
      return NextResponse.json(
        { success: false, error: 'Author ID is required' },
        { status: 400 }
      );
    }

    const result = await client.delete(authorId);
    
    return NextResponse.json({ 
      success: true, 
      result: result 
    });
  } catch (error) {
    console.error('Error deleting author:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 
