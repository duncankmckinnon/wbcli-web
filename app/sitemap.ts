import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs";

const BASE_URL = "https://wbcli.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocs();
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docs.map((doc) => ({
      url: `${BASE_URL}/docs/${doc.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
