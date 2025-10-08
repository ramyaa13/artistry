import { ReactNode } from "react";
import "../globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Artsphere - WebAR",
  description: "Markerless AR mural placement with AI-generated art",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
