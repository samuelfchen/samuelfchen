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
  metadataBase: new URL("https://samuelfchen.com"),
  title: {
    template: "%s | Samuel Chen",
    default: "Samuel Chen — Software Engineer, Sydney",
  },
  description:
    "Portfolio of Samuel Chen, software engineer based in Sydney. Experience at Atlassian, Airwallex, Akuna Capital. Frontend-focused full-stack developer.",
  keywords: [
    "Samuel Chen",
    "samuelfchen",
    "software engineer",
    "frontend developer",
    "full stack",
    "Atlassian",
    "Sydney",
    "portfolio",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Samuel Chen — Software Engineer",
    description:
      "Portfolio of Samuel Chen, software engineer based in Sydney. Experience at Atlassian, Airwallex, Akuna Capital.",
    url: "https://samuelfchen.com",
    siteName: "Samuel Chen",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Samuel Chen — Software Engineer",
    description:
      "Portfolio of Samuel Chen, software engineer based in Sydney. Experience at Atlassian, Airwallex, Akuna Capital.",
  },
  alternates: {
    canonical: "https://samuelfchen.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Samuel Chen",
              givenName: "Samuel",
              familyName: "Chen",
              url: "https://samuelfchen.com",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Atlassian",
              },
              knowsAbout: [
                "Frontend Development",
                "Full Stack Engineering",
                "React",
                "TypeScript",
              ],
            }),
          }}
        />
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
