import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cinzel",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Seena Grace John — Actor · Fashion Model",
  description:
    "Seena Grace John — Kerala-based actor, fashion model, and commercial model. Bridal, jewellery, fashion, and lifestyle portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
