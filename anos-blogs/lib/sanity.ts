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
