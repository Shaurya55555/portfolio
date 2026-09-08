import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://shaurya-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shaurya Bajpai // Full-Stack Software Engineer",
  description:
    "Interactive terminal portfolio of Shaurya Bajpai, a full-stack software engineer working across React/Next.js, Node.js, GraphQL, PostgreSQL, Docker and CI/CD.",
  keywords: [
    "Shaurya Bajpai",
    "Full-Stack Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "Portfolio",
  ],
  authors: [{ name: "Shaurya Bajpai" }],
  openGraph: {
    title: "Shaurya Bajpai // Full-Stack Software Engineer",
    description:
      "Interactive terminal portfolio. Type a command or tap a chip to explore.",
    url: siteUrl,
    siteName: "Shaurya Bajpai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Bajpai // Full-Stack Software Engineer",
    description:
      "Interactive terminal portfolio. Type a command or tap a chip to explore.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="crt">{children}</body>
    </html>
  );
}
