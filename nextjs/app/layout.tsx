import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "Assessment App",
  description: "Post management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
