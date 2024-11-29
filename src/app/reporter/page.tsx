'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Block } from '@/app/components/block';
import { Reports } from '@/app/reporter/components/report-list';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Block>
      <h2 className="text-2xl font-bold">年度提報</h2>
      <Button
        onClick={() => {
          router.push('/reporter/form');
        }}
        className="flex items-center gap-2"
      >
        新增提報
      </Button>
      <div className="flex items-center justify-between space-y-2">
        <Reports />
      </div>
    </Block>
  );
}
