export const dynamic = "force-dynamic";
import Link from "next/link";
import { client, urlFor } from "../lib/sanity";
import { latestPostsQuery } from "../lib/queries";
import { Post } from "../lib/sanity";

export default async function Home() {
  // Fetch the last 3 published blog posts
  let posts: Post[] = [];
  try {
    posts = await client.fetch(latestPostsQuery);
  } catch (e) {
    // fallback to empty
    posts = [];
  }
  return (
    <main>
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#f7f3e9] to-[#f4e6e8] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Text on the left */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-[#2c2a29] mb-4 font-serif">
              Welcome to Ano's Book Nook
            </h1>
            <p className="text-xl text-[#d4a574] mb-6 italic">
              Where every page is a new beginning.
            </p>
            <p className="text-lg text-[#6b5f5a] mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Searching for your next favorite read, a spark of inspiration, or a cozy corner to share ideas? You've found your literary home. Let's wander through stories, swap recommendations, and celebrate the magic of books together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/book-blog" 
                className="bg-[#d4a574] text-white px-8 py-3 rounded-full font-medium hover:bg-[#c49564] transition-colors"
              >
                Go To The Blog
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-[#d4a574] text-[#d4a574] px-8 py-3 rounded-full font-medium hover:bg-[#d4a574] hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          {/* Overlapping Images on the right */}
          <div className="flex-1 flex justify-center items-start relative min-h-[400px] md:min-h-[600px]">
            <div className="relative w-[400px] md:w-[600px] h-[400px] md:h-[600px]">
              <img
                src="/home/hero-section/hero1.jpg"
                alt="Books and cozy reading"
                className="rounded-lg shadow-lg w-[300px] md:w-[420px] h-[370px] md:h-[540px] object-cover border-4 border-[#e8dcc0] bg-[#f7f3e9] z-20 absolute left-0 top-12 md:top-20"
                style={{ zIndex: 2 }}
              />
              <img
                src="/home/hero-section/hero2.jpg"
                alt="More books and reading"
                className="rounded-lg shadow-lg w-[220px] md:w-[320px] h-[260px] md:h-[400px] object-cover border-4 border-[#e8dcc0] bg-[#f7f3e9] z-10 absolute left-56 md:left-80 -top-4 md:top-4 rotate-2"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-4 bg-[#fdfbf7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2a29] mb-4 font-serif">
              So glad you stopped by!
            </h2>
            <p className="text-lg text-[#6b5f5a] max-w-2xl mx-auto">
              At Ano's Book Nook, every reader, dreamer, and thinker is part of the family. This is a space for curious minds, heartfelt conversations, and the joy of discovering new stories. Whether you're a lifelong bookworm or just starting your reading journey, you belong here.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#6b5f5a] mb-8 max-w-2xl mx-auto leading-relaxed">
              Your local book enthusiast is here to help with recommendations, guide readers of all interests, and explore the deeper questions that literature and community can help us answer. Don't hesitate to reach out or share your own favorite reads!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" 
              className="bg-[#d4a574] text-white px-8 py-3 rounded-full font-medium hover:bg-[#c49564] transition-colors">
                My Story
              </Link>
              <Link href="/book-blog" 
              className="border-2 border-[#d4a574] text-[#d4a574] px-8 py-3 rounded-full font-medium hover:bg-[#d4a574] hover:text-white transition-colors">
                Book Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-[#f7f3e9]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c2a29] mb-12 text-center font-serif">
            Just Landed on the Shelf
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.length === 0 && (
              <div className="col-span-3 text-center text-[#6b5f5a]">No recent posts found.</div>
            )}
            {posts.map((post) => (
              <article key={post._id} className="bg-[#fdfbf7] rounded-lg shadow p-6 flex flex-col gap-4 border-t-4 border-[#d4a574]">
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(400).height(250).fit('crop').url()}
                    alt={post.title + ' cover'}
                    className="w-auto h-40 mx-auto rounded shadow mb-2 object-cover bg-[#f7f3e9]"
                  />
                )}
                <div className="flex gap-2">
                  {post.categories?.map((category, idx) => (
                    <span key={category._id || `${category.title}-${idx}` } className="bg-[#e8dcc0] text-[#6b5f5a] text-xs px-2 py-1 rounded-full">
                      {category.title}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[#2c2a29]">{post.title}</h3>
                <p className="text-[#6b5f5a] flex-grow">
                  {post.excerpt}
                </p>
                <Link href={`/book-blog/${post.slug.current}`} className="text-[#d4a574] hover:text-[#c49564] font-medium">
                  Read More
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/book-blog" 
              className="border-2 border-[#d4a574] text-[#d4a574] px-8 py-3 rounded-full font-medium hover:bg-[#d4a574] hover:text-white transition-colors"
            >
              More Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-[#d4a574]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-white">
            <p className="text-2xl md:text-3xl font-serif mb-4 italic">
              "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers."
            </p>
            <cite className="text-[#f7f3e9]">— Charles W. Eliot</cite>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2a29] text-[#f7f3e9] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ano's Book Nook</h3>
              <p className="text-[#d4c4a8] mb-4">
                Sharing stories, sparking ideas, and building a community of readers—one book at a time.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#d4c4a8] hover:text-[#d4a574]">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-[#d4c4a8] hover:text-[#d4a574]">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-[#d4c4a8] hover:text-[#d4a574]">
                  <i className="fab fa-goodreads"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-[#d4c4a8] hover:text-[#d4a574]">Home</Link></li>
                <li><Link href="/about" className="text-[#d4c4a8] hover:text-[#d4a574]">About</Link></li>
                <li><Link href="/book-blog" className="text-[#d4c4a8] hover:text-[#d4a574]">Book Blog</Link></li>
                <li><Link href="/collectivist" className="text-[#d4c4a8] hover:text-[#d4a574]">Collectivist</Link></li>
                <li><Link href="/essays" className="text-[#d4c4a8] hover:text-[#d4a574]">Essays</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><Link href="/book-blog" className="text-[#d4c4a8] hover:text-[#d4a574]">Book Reviews</Link></li>
                <li><Link href="/collectivist" className="text-[#d4c4a8] hover:text-[#d4a574]">Collectivist Thought</Link></li>
                <li><Link href="/essays" className="text-[#d4c4a8] hover:text-[#d4a574]">Essays</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#4a4438] pt-8 text-center">
            <p className="text-[#d4c4a8]">
              © 2024 Ano's Book Nook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
