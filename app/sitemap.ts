import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://scdytl-2026.vercel.app";
  const sections = ["", "#about", "#speakers", "#agenda", "#tickets", "#team", "#venue"];

  return sections.map((section) => ({
    url: `${baseUrl}/${section}`,
    lastModified: new Date(),
    changeFrequency: section === "" ? "daily" : "weekly",
    priority: section === "" ? 1.0 : 0.8,
  }));
}
