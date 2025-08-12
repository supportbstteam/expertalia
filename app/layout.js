import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';
import AuthProviders from '@/app/Next-auth-provider';
import 'flag-icons/css/flag-icons.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviders>
          <ReduxProvider>
            <Toaster position="top-right" />
            {children}
          </ReduxProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
