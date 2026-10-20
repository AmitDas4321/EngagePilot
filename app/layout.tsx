import type { Metadata } from "next";
import "./globals.css";
import "goey-toast/styles.css";
import GooeyToasterMount from "@/components/goey-toaster";
import QueryProvider from "@/lib/query/provider";
import { ThemeProvider } from "@/components/theme-provider";
// import Script from "next/script";
import Clarity from "@/components/Clarity";
import { funnelSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "EngagePilot - Open source Instagram comment-to-DM automation",
  description:
    "A free, self-hosted ManyChat alternative. Send an Instagram DM automatically when someone comments a keyword on your post or reel, using the official Meta API.",
  keywords: [
    "instagram automation",
    "comment to DM",
    "instagram private replies",
    "social media marketing",
    "manychat alternative",
  ],
  metadataBase: new URL("https://engagepilot.net"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="fO5UoXHouYo2kxDDl-d1_ij0txQCh-d6kpurFb9yjec"
        />
        <meta name="apple-mobile-web-app-title" content="EngagePilot" />
        {/* {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-scan/dist/auto.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )} */}
      </head>
      {process.env.NODE_ENV === "production" && <Clarity />}
      <body className={`min-h-full antialiased ${funnelSans.className}`} suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <GooeyToasterMount />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
