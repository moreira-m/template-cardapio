import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url";

// Validate environment variables at build time
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-22";

if (!projectId) {
    throw new Error(
        `Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID\n` +
        `This must be set in your Netlify environment variables.\n` +
        `Current value: ${projectId}`
    );
}

if (!dataset) {
    throw new Error(
        `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET\n` +
        `This must be set in your Netlify environment variables.\n` +
        `Current value: ${dataset}`
    );
}

// Validate projectId format (only a-z, 0-9, and dashes)
const projectIdRegex = /^[a-z0-9-]+$/;
if (!projectIdRegex.test(projectId)) {
    throw new Error(
        `Invalid NEXT_PUBLIC_SANITY_PROJECT_ID: "${projectId}"\n` +
        `Project ID can only contain lowercase letters (a-z), numbers (0-9), and dashes (-).\n` +
        `Check your Netlify environment variables for typos or invalid characters.`
    );
}

export { projectId, dataset, apiVersion };

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    stega: {
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
    },
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source).format('webp');
}
