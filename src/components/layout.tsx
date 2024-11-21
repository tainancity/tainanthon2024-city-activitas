'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/app/components/navbar';
import { Search } from '@/app/components/search';
import { Button } from '@/components/ui/button';
import { Footer } from '@/app/components/footer';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="hidden flex-col md:flex min-h-screen">
      <main className="flex-grow flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
            <div className="mx-4">
              <a href="/" className="text-2xl font-bold cursor-pointer">
                CityActivitas
              </a>
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
        <div className="flex-grow">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
