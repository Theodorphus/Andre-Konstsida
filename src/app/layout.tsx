import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Playfair Display: hög kontrast-serif, nära referensens Cochin-känsla
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-art.se"),
  title: {
    default: "André Roslund – Konst",
    template: "%s | André Art",
  },
  description:
    "Originalkonst av André Roslund. Se verken i galleriet och skicka en förfrågan om det du vill köpa.",
  openGraph: {
    title: "André Roslund – Konst",
    description:
      "Originalkonst av André Roslund. Se verken i galleriet och skicka en förfrågan om det du vill köpa.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
