import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import ModalProviders from "@/components/providers/ModalProviders";

export const metadata: Metadata = {
  title: "Free Online Appointment Scheduling Software | Calendly",
  description:
    "Calendly is the modern scheduling platform that makes “finding time” a breeze. When connecting is easy, your teams can get more done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          {children}
          <Toaster />
          <ModalProviders />
        </body>
      </html>
    </ClerkProvider>
  );
}
