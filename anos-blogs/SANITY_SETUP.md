# Sanity CMS Setup Guide

## 🚀 Quick Setup

### 1. Create a Sanity Project

If you haven't already, create a new Sanity project:

```bash
npm install -g @sanity/cli
sanity init --coupon javascriptmastery2022
```

Choose "Blog (schema)" when prompted.

### 2. Environment Variables

Create a `.env.local` file in your `anos-blogs` directory:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your-project-id` with your actual Sanity project ID (found in your Sanity dashboard or `sanity.json`).

### 3. Sanity Schema Setup

In your Sanity studio, you'll need these content types:

#### Post Schema (for Book Reviews)
```javascript
// schemas/post.js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
```

#### Essay Schema
```javascript
// schemas/essay.js
export default {
  name: 'essay',
  title: 'Essay',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {publishedAt} = selection
      return Object.assign({}, selection, {
        subtitle: publishedAt && `published on ${new Date(publishedAt).toLocaleDateString()}`,
      })
    },
  },
}
```

#### Category Schema
```javascript
// schemas/category.js
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
```

#### Author Schema
```javascript
// schemas/author.js
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
```

### 4. Update schema index

In your `schemas/index.js`, add all the schemas:

```javascript
import author from './author'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import essay from './essay'

export const schemaTypes = [post, author, category, blockContent, essay]
```

### 5. Add Sample Content

1. Start your Sanity studio: `sanity start`
2. Go to `http://localhost:3333`
3. Add some sample categories, authors, posts, and essays

### 6. Test the Connection

1. Start your Next.js app: `npm run dev`
2. Visit `/book-blog` and `/essays` to see your content
3. If you see "No posts found", check your environment variables and Sanity project ID

## 🔧 Troubleshooting

### Common Issues:

1. **"No posts found" error:**
   - Check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
   - Make sure you have published content in Sanity
   - Verify your dataset name (usually "production")

2. **CORS errors:**
   - Add your Next.js domain to Sanity CORS settings
   - Go to [manage.sanity.io](https://manage.sanity.io) → Your Project → API → CORS Origins
   - Add `http://localhost:3000` for development

3. **TypeScript errors:**
   - Make sure all imports are correct
   - Check that your schema types match the interfaces in `lib/sanity.ts`

## 📝 Next Steps

1. **Add more content types** as needed
2. **Set up image optimization** with `@sanity/image-url`
3. **Add rich text rendering** with `@portabletext/react`
4. **Implement search functionality**
5. **Add pagination** for large content lists

## 🚀 Deployment

When deploying to Vercel:
1. Add your environment variables in the Vercel dashboard
2. Add your production domain to Sanity CORS settings
3. Deploy your Sanity studio to [sanity.io/manage](https://www.sanity.io/manage)

---

**Need help?** Check the [Sanity documentation](https://www.sanity.io/docs) or [Next.js documentation](https://nextjs.org/docs). 