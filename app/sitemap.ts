import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const demos = [
  "shopkart", "luxenest", "drivenow", "glambride", "evermore", "resellhub",
  "bigwin", "stratos-erp", "pulsecrm", "spiceroute", "zoomride", "loopin",
  "streamx", "coinpulse", "rankforge", "mailmint", "cloudvault",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...demos.map((slug) => ({
      url: `${SITE_URL}/demos/${slug}.html`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
