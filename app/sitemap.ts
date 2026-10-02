import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.seo.siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
