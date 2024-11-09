'use client';

import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { Navbar } from '@/app/components/navbar';
import { Search } from '@/app/components/search';
import { Button } from '@/components/ui/button';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
              <div className="mx-4">
                <h1 className="text-2xl font-bold">CityActivitas</h1>
              </div>
              <Navbar />
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <Button
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  我想提案
                </Button>
              </div>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
