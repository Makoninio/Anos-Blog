import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // must be false for mutations
  token: process.env.SANITY_API_TOKEN, // <-- this line is required for writes
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Types for our content
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any; // Portable Text
  publishedAt: string;
  categories: Category[];
  author: Author;
  mainImage?: any;
  readingTime?: number;
  rating?: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface Author {
  _id: string;
  name: string;
  bio?: string;
  image?: any;
}

export interface Essay {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any;
  publishedAt: string;
  categories: Category[];
  tags: string[];
  readingTime?: number;
}

export interface CurrentlyReading {
  _id: string;
  title: string;
  author: string;
  description: string;
  progress: number;
  status: 'reading' | 'not-started' | 'on-hold' | 'completed';
  coverImage?: any;
  order: number;
} 