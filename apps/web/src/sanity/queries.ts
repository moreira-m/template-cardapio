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

export const SITE_SETTINGS_QUERY = defineQuery(`
  {
    "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
      siteName,
      "logo": logo.asset->url,
      headerColor,
      footerColor,
      carouselColor1,
      carouselColor2,
      carouselColor3,
      buttonPrimaryColor,
      buttonSecondaryColor
    },
    "social": *[_type == "socialSettings" && _id == "socialSettings"][0] {
      socialNetworks[] {
        platform,
        url,
        "icon": icon.asset->url
      }
    },
    "categories": *[_type == "homePage"][0].sections[]->sectionName
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

export async function getSiteSettings() {
  const { isEnabled } = await draftMode();

  const token = process.env.SANITY_API_READ_TOKEN;

  if (isEnabled && !token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
  }

  const clientWithToken = isEnabled ? client.withConfig({ token }) : client;

  const data = await clientWithToken.fetch(
    SITE_SETTINGS_QUERY,
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

  return {
    ...data.settings,
    socialNetworks: data.social?.socialNetworks || [],
    categories: data.categories || []
  };
}
