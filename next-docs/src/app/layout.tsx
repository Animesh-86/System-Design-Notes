import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { getAllContent } from "@/lib/content";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased flex h-screen overflow-hidden selection:bg-blue-500/30`}>
        <AuthProvider>
          <AppShell items={contentItems}>{children}</AppShell>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#141417',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e4e4e7',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
