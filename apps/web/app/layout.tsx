import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { meaningOfLife } from "@repo/common/meaning-of-life";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "NextJS Turborepo Demo",
  description: "NextJS Turborepo Demo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const meaningOfLifeValue = meaningOfLife();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>SSR: The meaning of life is {meaningOfLifeValue}</div>
        {children}
      </body>
    </html>
  );
}
