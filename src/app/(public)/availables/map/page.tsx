import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/(public)/availables/map/components/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="w-full h-full">
      <Map />
    </div>
  );
}
