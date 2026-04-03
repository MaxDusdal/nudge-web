import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "nudge — Better screen time habits, together.",
  description:
    "nudge is a peer accountability app that helps you build healthier screen time habits with someone you trust.",
  openGraph: {
    title: "nudge — Better screen time habits, together.",
    description:
      "nudge is a peer accountability app that helps you build healthier screen time habits with someone you trust.",
    type: "website",
    siteName: "nudge",
  },
  twitter: {
    card: "summary",
    title: "nudge — Better screen time habits, together.",
    description:
      "nudge is a peer accountability app that helps you build healthier screen time habits with someone you trust.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-app-bg text-app-text">
        {children}
        {/* reCAPTCHA v3 — site key is intentionally public */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
