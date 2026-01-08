import Link from 'next/link'
import { client, urlFor } from '../../../lib/sanity.server'
import { postsQuery } from '../../../lib/queries'
import DeletePostButton from './components/DeletePostButton'

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Posts</h1>
            <p className="text-gray-600">Manage and edit your blog content</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Main Admin
            </Link>
            <Link
              href="/admin/posts/new"
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Create New Post
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Create your first blog post to get started!</p>
            <Link
              href="/admin/posts/new"
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors duration-200 font-medium"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <div key={post._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-amber-50 to-amber-100">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).width(400).height(200).url()}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-amber-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-amber-400 text-sm font-medium">No image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Published
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    
                    {post.author && (
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {post.author.name}
                      </div>
                    )}

                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 2).map((cat: any, index: number) => (
                          <span key={index} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            {cat.title}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="text-amber-600 text-xs">+{post.categories.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/posts/${post.slug.current}`}
                        className="flex-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors duration-200 text-center"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/book-blog/${post.slug.current}`}
                        className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 text-center"
                        target="_blank"
                      >
                        View
                      </Link>
                    </div>
                    <DeletePostButton postId={post._id} postTitle={post.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
