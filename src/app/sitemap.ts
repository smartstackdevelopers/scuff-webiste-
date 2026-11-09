import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    "",
    "/about",
    "/services",
    "/services/interior-detailing",
    "/services/exterior-detailing",
    "/services/paint-correction",
    "/services/ceramic-coating",
    "/services/scuff-repair",
    "/gallery",
    "/pricing",
    "/booking",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
