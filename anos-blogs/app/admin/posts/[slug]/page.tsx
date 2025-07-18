'use client';

import { useState, useEffect } from 'react';
import { client } from '../../../../lib/sanity';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { urlFor } from '../../../../lib/sanity';

interface Author {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: { _ref: string };
  categories?: { _ref: string }[];
  readingTime?: number;
  rating?: number;
  body?: any[];
  mainImage?: any;
}

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    authorId: '',
    categoryIds: [] as string[],
    readingTime: '',
    rating: '',
    body: ''
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchPostAndData();
    }
  }, [params.slug]);

  const fetchPostAndData = async () => {
    try {
      const [postResult, authorsResult, categoriesResult] = await Promise.all([
        client.fetch(`*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          excerpt,
          author,
          categories,
          readingTime,
          rating,
          body,
          mainImage
        }`, { slug: params.slug }),
        client.fetch(`*[_type == "author"] | order(name asc) { _id, name }`),
        client.fetch(`*[_type == "category"] | order(title asc) { _id, title }`)
      ]);
      
      if (postResult) {
        setPost(postResult);
        setFormData({
          title: postResult.title,
          excerpt: postResult.excerpt || '',
          authorId: postResult.author?._ref || '',
          categoryIds: postResult.categories?.map((cat: any) => cat._ref) || [],
          readingTime: postResult.readingTime?.toString() || '',
          rating: postResult.rating?.toString() || '',
          body: postResult.body?.[0]?.children?.[0]?.text || ''
        });
        if (postResult.mainImage) {
          setCurrentImageUrl(urlFor(postResult.mainImage).width(400).height(200).url());
        }
      } else {
        alert('Post not found');
        router.push('/admin/posts');
      }
      
      setAuthors(authorsResult);
      setCategories(categoriesResult);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMainImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('postId', post._id);
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formDataToSend.append(key, v));
        } else {
          formDataToSend.append(key, value);
        }
      });
      if (mainImage) {
        formDataToSend.append('mainImage', mainImage);
      }

      const response = await fetch('/api/admin/update-post', {
        method: 'PUT',
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success) {
        alert('Post updated successfully!');
        router.push('/admin/posts');
      } else {
        alert('Failed to update post: ' + result.error);
      }
    } catch (error) {
      alert('Failed to update post: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        categoryIds: [...prev.categoryIds, categoryId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categoryIds: prev.categoryIds.filter(id => id !== categoryId)
      }));
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

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <Link
              href="/admin/posts"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Back to Posts
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <Link
            href="/admin/posts"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Back to Posts
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                placeholder="A short summary of the post..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Author
                </label>
                <select
                  value={formData.authorId}
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Reading Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categoryIds.includes(category._id)}
                      onChange={(e) => handleCategoryChange(category._id, e.target.checked)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-900">{category.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Content
              </label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-500"
                placeholder="Write your post content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Main Image
              </label>
              <input
                id="mainImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('mainImageInput')?.click()}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded font-medium transition mb-2"
              >
                {mainImage ? 'Change Image' : 'Upload Image'}
              </button>
              {mainImage && (
                <span className="ml-2 text-sm text-gray-700">{mainImage.name}</span>
              )}
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded border border-gray-200 mt-2" />
              ) : currentImageUrl ? (
                <img src={currentImageUrl} alt="Current" className="w-48 h-32 object-cover rounded border border-gray-200 mt-2" />
              ) : null}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                title="Save all changes, including the image"
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href="/admin/posts"
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