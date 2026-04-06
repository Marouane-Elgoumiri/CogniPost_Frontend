import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth.context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CogniPost",
  description: "A modern blog platform for sharing ideas and knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
  <body className="min-h-full flex flex-col bg-background text-foreground">
    <AuthProvider>{children}</AuthProvider>
    <Toaster />
  </body>
    </html>
  );
}
