import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "samuelfchen",
  description: "portfolio — work in progress",
  openGraph: {
    title: "samuelfchen",
    description: "portfolio — work in progress",
    url: "https://samuelfchen.com",
    siteName: "samuelfchen",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "samuelfchen",
    description: "portfolio — work in progress",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
