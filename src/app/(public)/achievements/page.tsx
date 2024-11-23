'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import PublicLayout from '@/components/layout';
import CaseTrackingMap from '@/app/(public)/achievements/components/case-tracking-map';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {
  const LIMIT = 12;

  const searchParams = useSearchParams();
  const { page } = Object.fromEntries(
    new URLSearchParams(searchParams).entries()
  );

  const [activatedAssets, setActivatedAssets] = useState<unknown[]>([]);
  const [activatedAssetsCount, setActivatedAssetsCount] = useState(0);

  useEffect(() => {
    const fetchActivatedAssets = async () => {
      const { data: activatedAssets, count } = await supabase
        .from('test_activated_assets')
        .select('*', { count: 'exact' })
        .limit(LIMIT)
        .range((+page - 1) * LIMIT, +page * LIMIT - 1);

      setActivatedAssets(activatedAssets || []);
      setActivatedAssetsCount(count || 0);
    };
    fetchActivatedAssets();
  }, [page]);

  const router = useRouter();

  return (
    <PublicLayout>
      <div
        className="flex"
        style={{
          maxHeight: 'calc(100vh - 4rem)',
        }}
      >
        <div
          className="w-3/5 overflow-scroll"
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-8">媒合成果</h2>
            <p className="mb-8">共 {activatedAssetsCount} 個已媒合案例</p>
            <Card className="flex cursor-pointer">
              <img
                src="https://via.placeholder.com/320x180"
                alt="Header"
                className="w-1/3 object-cover rounded-t-md"
              />
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="leading-6">title</CardTitle>
                  <CardDescription
                    className="leading-6
                  "
                  >
                    description
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          </div>
          <div className="p-8 grid grid-cols-3 gap-4">
            {(activatedAssets ?? []).map((asset, index) => (
              <Card
                onClick={() => {
                  router.push(`/achievements/${asset.id}`);
                }}
                key={index}
                className="relative cursor-pointer"
              >
                <img
                  src="https://via.placeholder.com/320x180"
                  alt="Header"
                  className="w-full object-cover rounded-t-md"
                />
                <CardHeader>
                  <CardTitle className="leading-6">
                    {asset.usage_plan}
                  </CardTitle>
                  <CardDescription className="leading-6">
                    {asset.location}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="m-8 flex gap-4 items-center justify-end">
            <Button
              disabled={+page === 1}
              onClick={() => {
                router.push(`/achievements?page=${+page - 1}`);
              }}
              variant="outline"
            >
              上一頁
            </Button>
            <Button
              disabled={+page * LIMIT > activatedAssetsCount}
              onClick={() => {
                router.push(`/achievements?page=${+page + 1}`);
              }}
              variant="outline"
            >
              下一頁
            </Button>
          </div>
        </div>
        <div
          className="flex-1"
          style={{
            minHeight: 'calc(100vh - 4rem)',
            maxHeight: 'calc(100vh - 4rem)',
          }}
        >
          <CaseTrackingMap locations={undefined} />
        </div>
      </div>
    </PublicLayout>
  );
}
