// "use client";
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';
import AuthProviders from '@/app/Next-auth-provider';
import 'flag-icons/css/flag-icons.min.css';
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable:"--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expertalia Admin",
  description: "Expertalia Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
         <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable}  antialiased`}>
        <AuthProviders>
          <ReduxProvider>
            <Toaster position="top-right" />
            <AppShell>
              {children}
            </AppShell>
          </ReduxProvider>
        </AuthProviders>
      </body>
    </html>
  );
}