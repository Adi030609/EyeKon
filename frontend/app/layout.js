import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
// import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "EyeKon AI - Protect Your Vision with AI-Powered Insights",
  description:
    "Real-time eye health monitoring with AI-driven insights and personalized recommendations.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}
