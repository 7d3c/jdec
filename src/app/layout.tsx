import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jens Décieux | Rechtsanwalt & Legal Tech",
  description: "Rechtsanwalt mit Fokus auf Legal Technology. Mein Herz schlägt für Legal Tech, klare Lösungen und pragmatische KI im Recht.",
  keywords: ["Rechtsanwalt", "Legal Tech", "Frankfurt", "KI im Recht", "Legal Technology"],
  authors: [{ name: "Jens Décieux" }],
  openGraph: {
    title: "Jens Décieux | Rechtsanwalt & Legal Tech",
    description: "Rechtsanwalt mit Fokus auf Legal Technology. Mein Herz schlägt für Legal Tech, klare Lösungen und pragmatische KI im Recht.",
    url: "https://decieux.de",
    siteName: "Jens Décieux",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
