import { siteConfig } from "@/lib/content";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    image: siteConfig.heroImage,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    url: siteConfig.url,
    priceRange: "£19.99 - £44.99+",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine1,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postcode,
      addressCountry: siteConfig.country,
    },
    areaServed: ["South Shields", "Jarrow", "Hebburn", "Boldon", "Sunderland", "Newcastle", "Durham"],
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}