import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import { PlayerGuard } from "@/components/shell/PlayerGuard";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { BackgroundMesh } from "@/components/ui/BackgroundMesh";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MINERVA — Personal Math Tutor",
  description: "Patient, step-by-step math tutoring for adults. Rebuild confidence with clear lessons and guided practice.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "MINERVA" },
};

export const viewport: Viewport = {
  themeColor: "#8c1515",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-primary">
        <SettingsProvider>
          <BackgroundMesh />
          <PlayerGuard>
            <ApplicationShell>{children}</ApplicationShell>
          </PlayerGuard>
          <ServiceWorkerRegister />
        </SettingsProvider>
      </body>
    </html>
  );
}
