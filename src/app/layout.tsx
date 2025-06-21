import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// ✅ Load Roboto font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Customize as needed
  variable: "--font-roboto",     // CSS variable name for use in styles
});

export const metadata: Metadata = {
  title: "Tasko | Task management platform",
  description: "Developed by - Md Abumahid Islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
