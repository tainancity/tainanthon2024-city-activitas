'use client';

import { useRouter } from 'next/navigation';
import PublicLayout from '@/components/layout';
import CaseTrackingMap from '@/app/(public)/achievements/components/case-tracking-map';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import supabase from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Page() {
  const LIMIT = 12;

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(LIMIT - 1);
  const [activatedAssets, setActivatedAssets] = useState([]);
  const [activatedAssetsCount, setActivatedAssetsCount] = useState(0);

  useEffect(() => {
    const fetchActivatedAssets = async () => {
      const { data: activatedAssets, count } = await supabase
        .from('test_activated_assets')
        .select('*', { count: 'exact' })
        .limit(LIMIT);
      // .range(from, to);

      setActivatedAssets(activatedAssets);
      setActivatedAssetsCount(count);
    };
    fetchActivatedAssets();
  }, []);

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
            <p className="pb-8">共 {activatedAssetsCount} 個已媒合案例</p>
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
