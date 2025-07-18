'use client';

import { useState, useEffect } from 'react';
import { client, urlFor } from '../../../lib/sanity';
import Link from 'next/link';

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: any;
  bio?: any[];
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    // Debug: Log the SANITY_API_TOKEN value
    // Note: process.env only works at build time in Next.js, so this will likely be undefined in the browser
    // But this will help confirm if it's available
    // eslint-disable-next-line no-console
    console.log('SANITY_API_TOKEN:', process.env.SANITY_API_TOKEN);
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const query = `*[_type == "author"] | order(name asc) {
        _id,
        name,
        slug,
        image,
        bio
      }`;
      const result = await client.fetch(query);
      setAuthors(result);
    } catch (error) {
      // Log the full error object for debugging
      console.error('Error fetching authors:', error);
      if (error && typeof error === 'object') {
        // eslint-disable-next-line no-console
        console.log('Full error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/create-author', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setFormData({ name: '', bio: '' });
        setShowForm(false);
        fetchAuthors();
      } else {
        alert('Failed to create author: ' + result.error);
      }
    } catch (error) {
      alert('Failed to create author: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (authorId: string) => {
    if (confirm('Are you sure you want to delete this author?')) {
      try {
        const response = await fetch('/api/admin/delete-author', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authorId }),
        });
        const result = await response.json();
        if (result.success) {
          fetchAuthors();
        } else {
          alert('Failed to delete author: ' + result.error);
        }
      } catch (error) {
        alert('Failed to delete author: ' + (error instanceof Error ? error.message : String(error)));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Authors</h1>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Main Admin
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {showForm ? 'Cancel' : 'Add Author'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Author</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter author bio..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  {submitting ? 'Creating...' : 'Create Author'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {author.image && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={urlFor(author.image).width(400).height(200).fit('crop').url()}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h3>
                {author.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {author.bio[0]?.children?.[0]?.text || 'No bio available'}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/authors/${author.slug.current}`}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(author._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {authors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No authors found. Add your first author to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
} 