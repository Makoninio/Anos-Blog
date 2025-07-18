import { client, urlFor } from "../../../lib/sanity";
import { postQuery } from "../../../lib/queries";
import { Post } from "../../../lib/sanity";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from '@portabletext/react';

interface Props {
  params: Promise<{ slug: string }>;
}

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children, value, index }) => <li key={value?._key || `bullet-${index}`}>{children}</li>,
    number: ({ children, value, index }) => <li key={value?._key || `number-${index}`}>{children}</li>,
  },
};

export default async function BookBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: Post = await client.fetch(postQuery, { slug });

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <article className="bg-[#fdfbf7] rounded-lg shadow p-6 border-t-4 border-[#d4a574]">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(600).height(350).fit('crop').url()}
            alt={post.title + ' cover'}
            className="w-full h-64 object-cover rounded mb-6 bg-[#f7f3e9]"
            loading="lazy"
          />
        )}
        <div className="flex gap-2 mb-3">
          {post.categories?.map((category, index) => (
            <span key={category._id || `category-${index}`} className="bg-[#e8dcc0] text-[#6b5f5a] text-xs px-2 py-1 rounded-full">
              {category.title}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#2c2a29] mb-2">{post.title}</h1>
        <div className="flex gap-4 text-xs text-[#6b5f5a] mb-4">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
        {post.rating && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#d4a574]">{'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}</span>
            <span className="text-xs text-[#6b5f5a]">{post.rating}/5</span>
          </div>
        )}
        <div className="prose prose-neutral max-w-none text-[#2c2a29] mb-6">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </div>
        <a href="/book-blog" className="text-[#d4a574] hover:text-[#c49564] font-medium">← Back to Book Blog</a>
      </article>
    </main>
  );
} 