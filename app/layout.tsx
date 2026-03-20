import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from './components/Header';
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
  title: "Digital Twin RAG System",
  description: "Local Retrieval-Augmented Generation system for professional profile queries with STAR methodology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Header />

          <main>{children}</main>

          <footer className="border-t border-gray-800 mt-20 py-8 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
              <p>Digital Twin RAG System</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
