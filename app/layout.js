import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deale Admin",
  description: "Deale Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Toaster position="top-right" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
