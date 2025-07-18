import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN, // Only available server-side
  useCdn: false,
});

export async function PUT(req: NextRequest) {
  try {
    const { bookId, title, author, description, progress, status, order } = await req.json();
    
    // Validate required fields
    if (!bookId || !title || !author) {
      return NextResponse.json(
        { success: false, error: 'Book ID, title, and author are required' },
        { status: 400 }
      );
    }

    // Update the book document
    const updateData: any = {
      title: title,
      author: author
    };

    if (description !== undefined) {
      updateData.description = description || undefined;
    }
    if (progress !== undefined) {
      updateData.progress = progress || 0;
    }
    if (status !== undefined) {
      updateData.status = status || 'reading';
    }
    if (order !== undefined) {
      updateData.order = order || 1;
    }

    const result = await client.patch(bookId).set(updateData).commit();
    
    return NextResponse.json({ 
      success: true, 
      book: result 
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 