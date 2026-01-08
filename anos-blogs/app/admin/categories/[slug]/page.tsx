'use client';

import { useState, useEffect } from 'react';
import { client } from '../../../../lib/sanity.client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (params.slug) {
      fetchCategory();
    }
  }, [params.slug]);

  const fetchCategory = async () => {
    try {
      const query = `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description
      }`;
      const result = await client.fetch(query, { slug: params.slug });
      
      if (result) {
        setCategory(result);
        setFormData({
          title: result.title,
          description: result.description || ''
        });
      } else {
        alert('Category not found');
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Error loading category');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/update-category', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: category._id,
          ...formData
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Category updated successfully!');
        router.push('/admin/categories');
      } else {
        alert('Failed to update category: ' + result.error);
      }
    } catch (error) {
      alert('Failed to update category: ' + (error instanceof Error ? error.message : String(error)));
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

  if (!category) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
            <Link
              href="/admin/categories"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Back to Categories
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <Link
            href="/admin/categories"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Back to Categories
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                placeholder="Enter category description..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {submitting ? 'Updating...' : 'Update Category'}
              </button>
              <Link
                href="/admin/categories"
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
