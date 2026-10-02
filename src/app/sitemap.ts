import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const paths = [
    "",
    "/guide",
    "/articles",
    "/articles/gomi-bukuro-size",
    "/articles/45l-awanai",
    "/privacy",
    "/disclaimer",
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/articles") ? 0.8 : 0.6,
  }));
}
