import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN, // Only available server-side
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const authorId = formData.get('authorId');
    const readingTime = formData.get('readingTime');
    const rating = formData.get('rating');
    const body = formData.get('body');
    const categoryIds = formData.getAll('categoryIds');
    const mainImageFile = formData.get('mainImage');

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    let mainImageRef = undefined;
    if (mainImageFile && typeof mainImageFile === 'object' && 'arrayBuffer' in mainImageFile) {
      const buffer = Buffer.from(await mainImageFile.arrayBuffer());
      const asset = await client.assets.upload('image', buffer, {
        filename: mainImageFile.name || 'main-image',
        contentType: mainImageFile.type,
      });
      mainImageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      };
    }

    const doc = {
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: String(title).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      excerpt: excerpt || undefined,
      publishedAt: new Date().toISOString(),
      readingTime: readingTime ? parseInt(String(readingTime)) : undefined,
      rating: rating ? parseInt(String(rating)) : undefined,
      body: body ? [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: body
            }
          ],
          style: 'normal'
        }
      ] : undefined,
      mainImage: mainImageRef,
    };

    if (authorId) {
      doc.author = {
        _type: 'reference',
        _ref: String(authorId)
      };
    }
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      doc.categories = categoryIds.map((id: any) => ({
        _type: 'reference',
        _ref: String(id)
      }));
    }

    const result = await client.create(doc);
    return NextResponse.json({ success: true, post: result });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
} 