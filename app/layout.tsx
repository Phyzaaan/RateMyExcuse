import type { Metadata } from "next";
import { baloo2, geistSans } from "./utils/libs/fonts";
import "./globals.css";
import { GlowBackground } from "./components/GlowBg";

export const metadata: Metadata = {
  title: "Rate My Excuse",
  description: "Get Brutually Judged By AI",
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
      <body className="h-screen w-screen flex flex-col items-center overflow-y-auto overflow-x-hidden">
        <GlowBackground className="fixed max-w-5xl w-full inset-y-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
