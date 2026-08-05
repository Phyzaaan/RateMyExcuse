import type { Metadata } from "next";
import { baloo2, geistSans } from "./utils/libs/fonts";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
