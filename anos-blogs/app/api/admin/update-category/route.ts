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

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Session not found' },
        { status: 401 }
      );
    }

    const { categoryId, title, description } = await req.json();
    
    // Validate required fields
    if (!categoryId || !title) {
      return NextResponse.json(
        { success: false, error: 'Category ID and title are required' },
        { status: 400 }
      );
    }

    // Update the category document
    const updateData: any = {
      title: title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }
    };

    if (description !== undefined) {
      updateData.description = description || undefined;
    }

    const result = await client.patch(categoryId).set(updateData).commit();
    
    return NextResponse.json({ 
      success: true, 
      category: result 
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 
