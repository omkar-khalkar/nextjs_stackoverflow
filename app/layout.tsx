//these are the imports for the layout
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/context/ThemeProvider";



//these are fonts from google fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

//this is the metadata for the website
export const metadata: Metadata = {
  title: "DevOverflow",
  description:
    "A community driven question and answer platform for developers, programmers, coders, software developers, software engineers, web developers, web designers, web programmers, web engineers, web coders, web software developers, web software engineers, web software designers, web software programmers. Ask questions, get answers, and share your knowledge with the world.",
  keywords:
    "stackoverflow clone, devoverflow, devoverflow clone, stackoverflow, stackoverflow clone, stackoverflow clone for developers, stackoverflow clone for programmers, stackoverflow clone for coders, stackoverflow clone for software developers, stackoverflow clone for software engineers, stackoverflow clone for web developers, stackoverflow clone for web designers, stackoverflow clone for web programmers, stackoverflow clone for web engineers, stackoverflow clone for web coders, stackoverflow clone for web software developers, stackoverflow clone for web software engineers, stackoverflow clone for web software designers, stackoverflow clone for web software programmers",
  icons: {
    icon: "./favicon.ico",
  },
};

//this is the root layout for the website
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
