'use client';

import { useState, useEffect } from 'react';
import { client } from '../../../lib/sanity.client';
import Link from 'next/link';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const query = `*[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }`;
      const result = await client.fetch(query);
      setCategories(result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/create-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setFormData({ title: '', description: '' });
        setShowForm(false);
        fetchCategories();
      } else {
        alert('Failed to create category: ' + result.error);
      }
    } catch (error) {
      alert('Failed to create category: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch('/api/admin/delete-category', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryId }),
        });
        const result = await response.json();
        if (result.success) {
          fetchCategories();
        } else {
          alert('Failed to delete category: ' + result.error);
        }
      } catch (error) {
        alert('Failed to delete category: ' + (error instanceof Error ? error.message : String(error)));
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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
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
              {showForm ? 'Cancel' : 'Add Category'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title
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
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter category description..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  {submitting ? 'Creating...' : 'Create Category'}
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
          {categories
            .filter((category) => category.slug && category.slug.current)
            .map((category) => (
              <div key={category._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {category.slug?.current || 'No slug'}
                  </span>
                </div>
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/categories/${category.slug?.current || ''}`}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found. Add your first category to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
} 
