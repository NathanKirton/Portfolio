import type { Metadata } from "next";

import { siteConfig } from "@/lib/content";

export function getMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url);

  return {
    title,
    description,
    alternates: { canonical: url.toString() },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.heroImage,
          width: 1600,
          height: 900,
          alt: "Modern locksmith van and security-focused hero image placeholder",
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.heroImage],
    },
  };
}