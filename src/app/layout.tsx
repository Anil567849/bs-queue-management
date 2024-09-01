import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Make unbiased situation based decision",
  description: "Make unbiased situation based decision",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
