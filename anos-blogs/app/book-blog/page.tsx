import React from "react";
import { client, urlFor } from "../../lib/sanity";
import { postsQuery, categoriesQuery, currentlyReadingQuery } from "../../lib/queries";
import { Post, Category, CurrentlyReading } from "../../lib/sanity";
import BookBlogClient from "./components/BookBlogClient";

async function getData() {
  try {
    console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    const posts = await client.fetch(postsQuery);
    const categories = await client.fetch(categoriesQuery);
    const currentlyReading = await client.fetch(currentlyReadingQuery);
    console.log('Fetched posts:', posts); // Add this line
    return { posts, categories, currentlyReading };
  } catch (error) {
    console.log('Sanity connection error:', error);
    // Return empty data if Sanity is not configured
    return { posts: [], categories: [], currentlyReading: [] };
  }
}

export default async function BookBlogPage() {
  const { posts, categories, currentlyReading } = await getData();
  
  return <BookBlogClient posts={posts} categories={categories} currentlyReading={currentlyReading} />;
} 