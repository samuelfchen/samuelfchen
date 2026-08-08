import type { Metadata } from "next";
import localFont from "next/font/local";
import Tmux from "../components/Tmux";
import { getGitInfo } from "../lib/git";
import "./globals.css";

const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/JetBrainsMonoNerd-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/JetBrainsMonoNerd-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/JetBrainsMonoNerd-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const git = getGitInfo();

  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body style={{ backgroundColor: "#282c34" }}>
        <main>
          <Tmux git={git}>{children}</Tmux>

          <div className="corner left">
            <a
              className="v1"
              data-tooltip="2021 — My first portfolio website, built in GatsbyJS"
              data-align="left"
              href="https://v1.samuelfchen.com"
            >
              v1
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
