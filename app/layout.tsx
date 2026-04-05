import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "workbench — Multi-agent orchestrator",
  description:
    "Dispatch AI coding agents in parallel across isolated git worktrees. Supports Claude Code, Gemini CLI, and Codex.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "workbench — Multi-agent orchestrator",
    description:
      "Dispatch AI coding agents in parallel across isolated git worktrees. Supports Claude Code, Gemini CLI, and Codex.",
    siteName: "wbcli",
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-brand-bg-primary text-brand-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
