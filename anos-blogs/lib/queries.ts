// GROQ queries for Sanity CMS

// Get all blog posts
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, image},
    mainImage,
    readingTime,
    rating
  }
`;

// Get a single post by slug
export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, image, bio},
    mainImage,
    readingTime,
    rating
  }
`;

// Get all essays
export const essaysQuery = `
  *[_type == "essay"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    tags,
    readingTime
  }
`;

// Get a single essay by slug
export const essayQuery = `
  *[_type == "essay" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    "categories": categories[]->{title, slug},
    tags,
    readingTime
  }
`;

// Get all categories
export const categoriesQuery = `*[_type == "category"]{_id, title}`;

// Get posts by category
export const postsByCategoryQuery = `
  *[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, image},
    mainImage,
    readingTime,
    rating
  }
`;

// Get featured posts
export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, image},
    mainImage,
    readingTime,
    rating
  }
`;

// Search posts and essays
export const searchQuery = `
  {
    "posts": *[_type == "post" && (title match $searchTerm + "*" || excerpt match $searchTerm + "*")] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "categories": categories[]->{title, slug},
      "author": author->{name, image},
      mainImage,
      readingTime,
      rating
    },
    "essays": *[_type == "essay" && (title match $searchTerm + "*" || excerpt match $searchTerm + "*")] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "categories": categories[]->{title, slug},
      tags,
      readingTime
    }
  }
`;

// Get the latest 3 posts
export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, image},
    mainImage,
    readingTime,
    rating
  }
`;

// Get currently reading books
export const currentlyReadingQuery = `
  *[_type == "currentlyReading"] | order(order asc) {
    _id,
    title,
    author,
    description,
    progress,
    status,
    coverImage,
    order
  }
`;

export const authorsQuery = `*[_type == "author"]{_id, name, image, bio}`; 