import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MobileCallButton } from "@/components/shared/mobile-call-button";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { StructuredData } from "@/components/shared/structured-data";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { siteConfig } from "@/lib/content";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/branding/irongate-badge.png", type: "image/png" }],
    shortcut: "/branding/irongate-badge.png",
    apple: "/branding/irongate-badge.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-full bg-white font-sans text-[#1f2937] antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#427415] focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <ThemeProvider>
          <StructuredData />
          <div className="app-shell relative flex min-h-screen flex-col overflow-x-clip bg-[radial-gradient(circle_at_top,_rgba(66,116,21,0.10),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f8fbf5_62%,_#f4f8ef_100%)]">
            <SiteHeader />
            <main id="main-content" className="flex-1">{children}</main>
            <SiteFooter />
            <MobileCallButton />
          </div>
          <Toaster theme="light" position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
