'use client';

import { useParams } from 'next/navigation';
import { AchievementsCarousel } from '@/app/components/achievements-carousel';
import { Block } from '@/app/components/block';

export default function Page() {
  const { id } = useParams();

  return (
    <>
      <Block>
        <div className="flex items-center justify-between space-y-2">
          <AchievementsCarousel />
        </div>
      </Block>
      <Block>
        <h2 className="text-2xl font-bold">{id}</h2>
        <div className="flex items-center justify-between space-y-2">
          {/* TODO */}
        </div>
      </Block>
    </>
  );
}
