import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { GoogleMapsProvider } from '@/components/providers/google-maps-provider';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CityActivitas',
  description:
    '臺南市政府財政稅務局閒置公有資產管理系統 (來！說出你的願望吧！)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleMapsProvider>
          {children}
          <Toaster />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
