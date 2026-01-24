import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { getSiteSettings } from "@/sanity/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Template Cardápio",
  description: "Template para cardápios",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <Header siteSettings={siteSettings} />
        {children}
        <Footer siteSettings={siteSettings} />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
