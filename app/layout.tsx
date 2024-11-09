import type { Metadata } from "next";
import { Poltawski_Nowy, Lexend } from "next/font/google";
import "./globals.css";


const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  variable: "--font-serif",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Capricorn Technology",
  description:
    "We transform ideas into digital realities that captivate, inspire, and engage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poltawskiNowy.variable} ${lexend.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
