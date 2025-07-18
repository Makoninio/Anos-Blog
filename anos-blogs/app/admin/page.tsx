export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl p-10 border border-amber-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-amber-700 rounded-full p-3 mb-3 shadow">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-500 text-base text-center">Welcome! Use the links below to manage your blog content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/admin/posts" className="block bg-amber-50 border border-amber-200 rounded-xl p-6 shadow hover:bg-amber-100 transition">
            <h2 className="text-lg font-bold text-amber-800 mb-1">Posts</h2>
            <p className="text-gray-600 text-sm">Create, edit, and manage blog posts.</p>
          </a>
          <a href="/admin/authors" className="block bg-amber-50 border border-amber-200 rounded-xl p-6 shadow hover:bg-amber-100 transition">
            <h2 className="text-lg font-bold text-amber-800 mb-1">Authors</h2>
            <p className="text-gray-600 text-sm">Manage author profiles and bios.</p>
          </a>
          <a href="/admin/categories" className="block bg-amber-50 border border-amber-200 rounded-xl p-6 shadow hover:bg-amber-100 transition">
            <h2 className="text-lg font-bold text-amber-800 mb-1">Categories</h2>
            <p className="text-gray-600 text-sm">Organize posts by category.</p>
          </a>
          <a href="/admin/currently-reading" className="block bg-amber-50 border border-amber-200 rounded-xl p-6 shadow hover:bg-amber-100 transition">
            <h2 className="text-lg font-bold text-amber-800 mb-1">Currently Reading</h2>
            <p className="text-gray-600 text-sm">Update your currently reading list.</p>
          </a>
        </div>
      </div>
    </div>
  )

}
