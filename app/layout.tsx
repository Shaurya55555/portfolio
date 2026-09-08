import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://shaurya-bajpai.vercel.app";
const description =
  "Full-stack software engineer and B.Tech CSE student at LNMIIT. Builds web products end to end with React, Node.js, FastAPI, and PostgreSQL, and integrates large language models into real applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shaurya Bajpai, Full-Stack Software Engineer",
  description,
  keywords: [
    "Shaurya Bajpai",
    "full-stack developer",
    "software engineer",
    "React",
    "Node.js",
    "FastAPI",
    "PostgreSQL",
    "LLM",
    "LangChain",
    "RAG",
    "LNMIIT",
    "Bengaluru",
    "backend developer",
    "AI developer",
  ],
  authors: [{ name: "Shaurya Bajpai" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Shaurya Bajpai, Software Engineer",
    description:
      "Full-stack engineer working across web, backend, and applied AI. Two internships, hackathon wins, and deployed side projects.",
    url: siteUrl,
    siteName: "Shaurya Bajpai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Bajpai, Software Engineer",
    description:
      "Full-stack engineer working across web, backend, and applied AI. Two internships, hackathon wins, and deployed side projects.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
