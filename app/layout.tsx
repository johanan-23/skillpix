import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BotIdClient } from "botid/client";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const protectedRoutes = [
  {
    path: "/login",
    method: "POST",
  },
  {
    path: "/api/chatbot",
    method: "POST",
  },
];

export const metadata: Metadata = {
  title: {
    template: "%s | Skillpix",
    default: "Skillpix",
  },
  description:
    "Skillpix is the all-in-one platform where students learn job-ready skills, build real-world projects, and train for placements with aptitude prep, resume tools, and mock interviews. From learning to earning — in one powerful experience.",
  openGraph: {
    title: "Skillpix – Skills. Projects. Placement.",
    description:
      "Master real skills, apply them through live projects, and get placement-ready with training that works — all in one platform.",
    url: "https://skillpix.com",
    siteName: "Skillpix",
    images: ["/skillpix-og.jpeg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    title: "Skillpix – Skills. Projects. Placement.",
    description:
      "Master real skills, apply them through live projects, and get placement-ready with training that works — all in one platform.",
    card: "summary_large_image",
    creator: "@johanan_offl",
    site: "@skillpix_offl",
    images: ["/skillpix-og.jpeg"],
  },
  keywords: [
    "skillpix",
    "placement training",
    "aptitude prep",
    "resume evaluation",
    "project-based learning",
    "student skill platform",
    "job-ready skills",
    "from learning to earning",
    "coding prep",
    "engineering placement",
    "soft skills training",
    "mock interviews",
    "career prep platform",
    "campus recruitment",
    "skill development",
    "real-world projects",
    "student success",
    "employability skills",
    "skill enhancement",
    "project showcase",
    "job placement training",
    "career readiness",
    "skill acquisition",
    "student empowerment",
    "skill development platform",
    "project-based education",
    "job preparation skills",
    "career advancement",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Skillpix" />
        <link
          href="/favicon.ico"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href="/favicon-dark.png"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <BotIdClient protect={protectedRoutes} />
      </Head>
      <body className={"antialiased"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
