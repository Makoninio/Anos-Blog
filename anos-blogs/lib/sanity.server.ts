import "server-only";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Runtime check to ensure this is only used server-side
if (typeof window !== "undefined") {
  throw new Error(
    "sanity.server.ts can only be imported in Server Components. " +
    "Use sanity.client.ts in Client Components instead."
  );
}

// Use next-sanity which is designed for Next.js server components
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
