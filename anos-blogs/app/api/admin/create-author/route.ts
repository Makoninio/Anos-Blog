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

    const { name, bio } = await req.json();
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create the author document
    const doc = {
      _type: 'author',
      name: name,
      slug: {
        _type: 'slug',
        current: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      bio: bio ? [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: bio
            }
          ],
          style: 'normal'
        }
      ] : undefined
    };

    const result = await client.create(doc);
    
    return NextResponse.json({ 
      success: true, 
      author: result 
    });
  } catch (error) {
    console.error('Error creating author:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
