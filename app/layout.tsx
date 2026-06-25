import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "theforge — Software & Digital Marketing Studio",
  description:
    "theforge builds the software and digital marketing systems small and mid-sized businesses run on — websites, web apps, e-commerce, SEO, and brand work for clients worldwide.",
  keywords: [
    "software development",
    "digital marketing",
    "web design",
    "web development",
    "nextjs",
    "studio",
    "SMB",
  ],
  openGraph: {
    title: "theforge — Software & Digital Marketing Studio",
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
    <html lang="en" className="grain" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
