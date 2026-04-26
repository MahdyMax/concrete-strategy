import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concrete Strategy",
  description:
    "Mix & match Concrete vaults like Lego bricks. Discover your perfect yield style — no real money needed!",
  openGraph: {
    title: "Concrete Strategy",
    description: "Mix & match Concrete vaults like Lego bricks.",
    url: "https://app.concrete.xyz/earn",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
