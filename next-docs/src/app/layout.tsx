import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getAllContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "System Design Hub",
  description: "Comprehensive resources for System Design, HLD, and LLD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contentItems = getAllContent();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased flex h-screen overflow-hidden selection:bg-blue-500/30`}>
        <Sidebar items={contentItems} />
        <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 p-8 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
