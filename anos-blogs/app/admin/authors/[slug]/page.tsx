'use client';

import { useState, useEffect } from 'react';
import { client } from '../../../../lib/sanity.client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  bio?: any[];
}

export default function EditAuthorPage() {
  const params = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    if (params.slug) {
      fetchAuthor();
    }
  }, [params.slug]);

  const fetchAuthor = async () => {
    try {
      const query = `*[_type == "author" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        bio
      }`;
      const result = await client.fetch(query, { slug: params.slug });
      
      if (result) {
        setAuthor(result);
        setFormData({
          name: result.name,
          bio: result.bio?.[0]?.children?.[0]?.text || ''
        });
      } else {
        alert('Author not found');
        router.push('/admin/authors');
      }
    } catch (error) {
      console.error('Error fetching author:', error);
      alert('Error loading author');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;
    
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/update-author', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: author._id,
          ...formData
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Author updated successfully!');
        router.push('/admin/authors');
      } else {
        alert('Failed to update author: ' + result.error);
      }
    } catch (error) {
      alert('Failed to update author: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Author not found</h1>
            <Link
              href="/admin/authors"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Back to Authors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Author</h1>
          <Link
            href="/admin/authors"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Back to Authors
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Name *
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
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                placeholder="Enter author bio..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {submitting ? 'Updating...' : 'Update Author'}
              </button>
              <Link
                href="/admin/authors"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
