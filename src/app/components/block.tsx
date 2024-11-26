import { ReactNode } from 'react';

export const Block = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="flex-1 space-y-4 p-8 pt-6 mx-auto max-w-screen-xl min-w-[1280px] mb-36">
    {children}
  </div>
);
