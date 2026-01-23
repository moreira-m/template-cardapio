import { defineQuery } from "next-sanity";
import { client } from "./client";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    title,
    sections[]->{
      _type,
      _key,
      sectionName,
      enableFilter,
      items[] {
        name,
        description,
        price,
        image,
        _key
      },
      itemsOmnivore[] {
        name,
        description,
        price,
        image,
        _key
      },
      itemsVegetarian[] {
        name,
        description,
        price,
        image,
        _key
      },
      itemsVegan[] {
        name,
        description,
        price,
        image,
        _key
      }
    }
  }
`);

import { draftMode } from "next/headers";

export async function getHomePage() {
  const { isEnabled } = await draftMode();

  const token = process.env.SANITY_API_READ_TOKEN;

  if (isEnabled && !token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
  }

  const clientWithToken = isEnabled ? client.withConfig({ token }) : client;

  return await clientWithToken.fetch(
    HOME_PAGE_QUERY,
    {},
    {
      stega: isEnabled,
      perspective: isEnabled ? "previewDrafts" : "published",
      useCdn: !isEnabled,
      next: {
        revalidate: isEnabled ? 0 : 60,
      },
    }
  );
}
