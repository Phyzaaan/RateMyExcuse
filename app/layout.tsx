import type { Metadata } from "next";
import { baloo2, geistSans } from "./utils/libs/fonts";
import "./globals.css";
import { GlowBackground } from "./components/GlowBg";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rate My Excuse",
  description: "Get Brutually Judged By AI",
  other: {
    "google-adsense-account": "ca-pub-2430162464533504",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${baloo2.variable} antialiased`}
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2430162464533504"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="ad-config" strategy="afterInteractive">
          {`
            window.adsbygoogle = window.adsbygoogle || [];
            window.adBreak = window.adConfig = function(o) { adsbygoogle.push(o); };
          `}
        </Script>
      </head>
      <body className="h-screen w-screen flex flex-col items-center overflow-y-auto overflow-x-hidden">
        <GlowBackground className="fixed max-w-5xl w-full inset-y-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
