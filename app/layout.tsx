import type { Metadata } from "next";
import { Poppins, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// Editorial italic accent words in headings.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Labels, terminal panels and chips.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
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
    images: [
      {
        url: "/og-image.png?v=peach",
        width: 1200,
        height: 630,
        alt: "Shaurya Bajpai, Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Bajpai, Software Engineer",
    description:
      "Full-stack engineer working across web, backend, and applied AI. Two internships, hackathon wins, and deployed side projects.",
    images: ["/og-image.png?v=peach"],
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
      className={`${poppins.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
