import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q-finder APP",
  description: "Q-finder APP to generate FAQ with matched answers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monserrat.className}>{children}</body>
    </html>
  );
}
