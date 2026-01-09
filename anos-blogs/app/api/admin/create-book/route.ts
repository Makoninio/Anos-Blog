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

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Session not found' },
        { status: 401 }
      );
    }

    const { title, author, description, progress, status, order } = await req.json();
    
    // Validate required fields
    if (!title || !author) {
      return NextResponse.json(
        { success: false, error: 'Title and author are required' },
        { status: 400 }
      );
    }

    // Create the book document
    const doc = {
      _type: 'currentlyReading',
      title: title,
      author: author,
      description: description || undefined,
      progress: progress || 0,
      status: status || 'reading',
      order: order || 1
    };

    const result = await client.create(doc);
    
    return NextResponse.json({ 
      success: true, 
      book: result 
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 
