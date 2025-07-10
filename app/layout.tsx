import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BotIdClient } from "botid/client";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

const protectedRoutes = [
	{
		path: "/login",
		method: "POST",
	},
	{
		path: "/api/chatbot",
		method: "POST",
	},
	{
		path: "/admin",
		method: "GET",
	},
];

export const metadata: Metadata = {
	metadataBase: new URL("https://www.skillpix.com"),
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
	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
		],
		apple: [
			{ url: "/apple-icon-57x57.png", sizes: "57x57" },
			{ url: "/apple-icon-60x60.png", sizes: "60x60" },
			{ url: "/apple-icon-72x72.png", sizes: "72x72" },
			{ url: "/apple-icon-76x76.png", sizes: "76x76" },
			{ url: "/apple-icon-114x114.png", sizes: "114x114" },
			{ url: "/apple-icon-120x120.png", sizes: "120x120" },
			{ url: "/apple-icon-144x144.png", sizes: "144x144" },
			{ url: "/apple-icon-152x152.png", sizes: "152x152" },
			{ url: "/apple-icon-180x180.png", sizes: "180x180" },
		],
		other: [
			{
				rel: "mask-icon",
				url: "/favicon.ico",
				color: "#6F4E37",
			},
		],
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
      <head>
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
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        {/* Prefetch likely navigation targets */}
        <link rel="prefetch" href="/login" />
        <link rel="prefetch" href="/about-us" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BotIdClient protect={protectedRoutes} />
          <Toaster />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
