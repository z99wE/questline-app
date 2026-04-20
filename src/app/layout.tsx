import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuestLine | Logistics & Crowd Management",
  description: "A gamified logistics app for event crowd management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased scroll-smooth">
        {children}
      </body>
    </html>
  );
}
