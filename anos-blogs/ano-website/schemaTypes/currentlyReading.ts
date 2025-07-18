import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'currentlyReading',
  title: 'Currently Reading',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the book or reading progress',
    }),
    defineField({
      name: 'progress',
      title: 'Reading Progress (%)',
      type: 'number',
      description: 'Percentage of the book completed (0-100)',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Currently Reading', value: 'reading'},
          {title: 'Not Started', value: 'not-started'},
          {title: 'On Hold', value: 'on-hold'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this book appears (lower numbers appear first)',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      status: 'status',
      progress: 'progress',
    },
    prepare(selection) {
      const {title, author, status, progress} = selection
      return {
        title: title,
        subtitle: `${author} - ${status}${progress ? ` (${progress}%)` : ''}`,
      }
    },
  },
}) 