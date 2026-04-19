import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const siteDescription =
  "Ultra-lightweight multi-agent orchestrator. Dispatch AI coding agents in parallel across isolated git worktrees. Supports Claude Code, Gemini CLI, OpenAI Codex, and Cursor CLI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wbcli.com"),
  title: {
    default: "workbench — Multi-agent orchestrator",
    template: "%s — workbench",
  },
  description: siteDescription,
  applicationName: "workbench",
  keywords: [
    "workbench",
    "wbcli",
    "multi-agent orchestrator",
    "AI coding agents",
    "Claude Code",
    "Gemini CLI",
    "OpenAI Codex",
    "Cursor CLI",
    "git worktrees",
    "parallel AI",
    "developer tools",
    "TDD",
    "test-driven development",
  ],
  authors: [{ name: "Duncan McKinnon", url: "https://github.com/duncankmckinnon" }],
  creator: "Duncan McKinnon",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "workbench — Multi-agent orchestrator",
    description: siteDescription,
    url: "https://wbcli.com",
    siteName: "workbench",
    type: "website",
    images: [
      {
        url: "/workbench-banner-2.png",
        width: 2436,
        height: 1011,
        alt: "workbench logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "workbench — Multi-agent orchestrator",
    description: siteDescription,
    images: ["/workbench-banner-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "workbench",
  alternateName: "wbcli",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description: siteDescription,
  url: "https://wbcli.com",
  downloadUrl: "https://pypi.org/project/wbcli/",
  softwareVersion: "latest",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Duncan McKinnon",
    url: "https://github.com/duncankmckinnon",
  },
  codeRepository: "https://github.com/duncankmckinnon/workbench",
  programmingLanguage: "Python",
  license: "https://opensource.org/licenses/MIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-brand-bg-primary text-brand-text-primary font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
