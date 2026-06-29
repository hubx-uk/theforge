import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "theforge • Growth Studio",
  description:
    "theforge builds the software and digital marketing systems small and mid-sized businesses run on — websites, web apps, e-commerce, SEO, and brand work for clients worldwide.",
  keywords: [
    "software development",
    "mobile development",
    "digital marketing",
    "web design",
    "web development",
    "email campaigns",
    "ad campaigns",
    "wordpress",
    "shopify",
    "nextjs",
    "studio",
    "SBS",
    "SMB",
  ],
  openGraph: {
    title: "theforge • Growth Studio",
    description:
      "Software and digital marketing systems for small and medium-sized businesses worldwide.",
    url: "https://theforge.ng",
    siteName: "theforge",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="grain"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
