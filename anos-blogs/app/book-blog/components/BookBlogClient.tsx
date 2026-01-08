"use client";

import React, { useState, useMemo } from "react";
import { Post, Category, CurrentlyReading } from "../../../lib/sanity";
import { urlFor } from "../../../lib/sanity.client";

interface BookBlogClientProps {
  posts: Post[];
  categories: Category[];
  currentlyReading: CurrentlyReading[];
}

export default function BookBlogClient({ posts, categories, currentlyReading }: BookBlogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts based on search term and selected category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === null || 
        post.categories?.some(cat => cat.title === selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 font-serif text-[#2c2a29]">Book Blog</h1>
        <p className="text-lg text-[#6b5f5a]">Discover new favorites, hidden gems, and honest reflections on the books that shape us.</p>
      </header>
      
      {/* Search and Filter Section */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="relative w-full md:w-1/2">
          <input 
            type="text" 
            placeholder="Search reviews..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-[#e8dcc0] rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-[#d4a574] text-[#2c2a29] placeholder-[#6b5f5a]" 
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5f5a]">🔍</span>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full border-2 font-medium transition-colors ${
              selectedCategory === null
                ? "border-[#d4a574] bg-[#f4e6e8] text-[#d4a574]"
                : "border-[#e8dcc0] text-[#6b5f5a] hover:border-[#d4a574] hover:bg-[#f4e6e8]"
            }`}
          >
            All
          </button>
          {categories?.map((category: Category) => (
            <button 
              key={category._id || category.title} 
              onClick={() => setSelectedCategory(category.title)}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                selectedCategory === category.title
                  ? "border-[#d4a574] bg-[#f4e6e8] text-[#d4a574]"
                  : "border-[#e8dcc0] text-[#6b5f5a] hover:border-[#d4a574] hover:bg-[#f4e6e8]"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: Post) => (
            <article key={post._id} className="bg-[#fdfbf7] rounded-lg shadow p-6 flex flex-col gap-2 border-t-4 border-[#d4a574]">
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(400).height(250).fit('crop').url()}
                  alt={post.title + ' cover'}
                  className="w-full h-48 object-cover rounded mb-2 bg-[#f7f3e9]"
                  loading="lazy"
                />
              )}
              <div className="flex gap-2 mb-1">
                <span className="bg-[#d4a574] text-white text-xs px-2 py-1 rounded-full">Book Review</span>
                {post.categories?.map((category, idx) => (
                  <span key={category._id || `${category.title}-${idx}` } className="bg-[#e8dcc0] text-[#6b5f5a] text-xs px-2 py-1 rounded-full">
                    {category.title}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold font-serif text-[#2c2a29]">{post.title}</h2>
              <div className="flex gap-4 text-xs text-[#6b5f5a] mb-2">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span>{post.readingTime || 5} min read</span>
              </div>
              <p className="text-[#6b5f5a] mb-2">{post.excerpt}</p>
              {post.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#d4a574]">{'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}</span>
                  <span className="text-xs text-[#6b5f5a]">
                    {post.rating}/5 – {post.rating >= 4 ? 'A must-read' : post.rating >= 3 ? 'Recommended' : 'Worth a look'}
                  </span>
                </div>
              )}
              <a 
                href={`/book-blog/${post.slug.current}`} 
                className="text-[#d4a574] hover:text-[#c49564] font-medium"
              >
                Read Full Review ⟶
              </a>
            </article>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <div className="mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-[#2c2a29] mb-2">
              {posts.length === 0 ? "No book reviews yet" : "No posts match your search"}
            </h3>
            <p className="text-[#6b5f5a] mb-4">
              {posts.length === 0 ? 
                "Check back soon for new bookish adventures!" :
                "Try adjusting your search terms or category filter."
              }
            </p>
          </div>
        )}
      </section>

      {/* Pagination - Only show if there are posts */}
      {filteredPosts.length > 0 && (
        <section className="flex justify-center mb-12">
          <nav className="flex gap-2">
            <a href="#" className="px-3 py-1 rounded border-2 border-[#d4a574] bg-[#f4e6e8] text-[#d4a574] font-medium">1</a>
            <a href="#" className="px-3 py-1 rounded border-2 border-[#e8dcc0] text-[#6b5f5a] font-medium hover:border-[#d4a574] hover:bg-[#f4e6e8]">2</a>
            <a href="#" className="px-3 py-1 rounded border-2 border-[#e8dcc0] text-[#6b5f5a] font-medium hover:border-[#d4a574] hover:bg-[#f4e6e8]">3</a>
            <a href="#" className="px-3 py-1 rounded border-2 border-[#e8dcc0] text-[#6b5f5a] font-medium hover:border-[#d4a574] hover:bg-[#f4e6e8]">Next ⟶</a>
          </nav>
        </section>
      )}

      {/* Currently Reading Section - Only show if there are posts */}
      {currentlyReading.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold font-serif text-center mb-6 text-[#2c2a29]">Currently Reading</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {currentlyReading.map((book) => (
              <div key={book._id} className="bg-[#f7f3e9] rounded-lg p-4 flex flex-col items-center text-center">
                {book.coverImage ? (
                  <img
                    src={urlFor(book.coverImage).width(120).height(180).fit('crop').url()}
                    alt={`${book.title} cover`}
                    className="w-20 h-30 object-cover rounded shadow-md mb-4"
                  />
                ) : (
                  <span className="text-4xl text-[#d4a574] mb-3">📖</span>
                )}
                <div className="w-full">
                  <h4 className="font-semibold font-serif text-[#2c2a29]">{book.title}</h4>
                  <p className="text-[#6b5f5a] text-sm">{book.author}</p>
                  {book.description && (
                    <p className="text-[#6b5f5a] text-xs mt-2">{book.description}</p>
                  )}
                  <div className="w-full bg-[#e8dcc0] rounded h-2 mt-2 mb-1">
                    <div 
                      className="bg-[#d4a574] h-2 rounded" 
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#6b5f5a]">
                    {book.status === 'reading' && book.progress > 0 ? `${book.progress}% complete` :
                     book.status === 'not-started' ? 'Not started' :
                     book.status === 'on-hold' ? 'On hold' :
                     book.status === 'completed' ? 'Completed' :
                     'Reading'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
} 
