'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import { AchievementsCarousel } from '@/app/components/achievements-carousel';
import { Block } from '@/app/components/block';
import PublicLayout from '@/components/layout';
import AchievementLocationMap from '../components/achievement-location-map';

export default function Page() {
  const { id } = useParams();

  const [activatedAsset, setActivatedAsset] = useState<unknown>({});

  useEffect(() => {
    const fetchActivatedAsset = async () => {
      const { data: activatedAsset } = await supabase
        .from('test_activated_assets')
        .select(
          `
          *, 
          test_assets(*),
          test_usage_types(*)
          `
        )
        .eq('id', id)
        .single();
      setActivatedAsset(activatedAsset);
    };
    fetchActivatedAsset();
  }, [id]);

  const DetailBlock = ({ label = '', value = '' }) => (
    <div>
      <p className="mb-2 text-lg text-gray-400">{label}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );

  return (
    <PublicLayout>
      <Block>
        <div className="flex items-center justify-between space-y-2">
          <AchievementsCarousel />
        </div>
      </Block>
      <Block>
        <h2 className="text-4xl font-bold mb-16">{activatedAsset?.location}</h2>
        <div className="flex">
          <div className="flex-col grow items-start flex space-y-2">
            {[
              { label: '年度', value: activatedAsset?.year },
              {
                label: '計畫用途類別',
                value: activatedAsset?.test_usage_types?.name,
              },
              { label: '計畫用途', value: activatedAsset?.usage_plan },
              {
                label: '土地公告現值',
                value: new Intl.NumberFormat('zh-TW', {
                  style: 'currency',
                  currency: 'TWD',
                }).format(activatedAsset?.land_value),
              },
              {
                label: '房屋課稅現值',
                value: new Intl.NumberFormat('zh-TW', {
                  style: 'currency',
                  currency: 'TWD',
                }).format(activatedAsset?.building_value),
              },
              {
                label: '節流效益',
                value: new Intl.NumberFormat('zh-TW', {
                  style: 'currency',
                  currency: 'TWD',
                }).format(activatedAsset?.benefit_value),
              },
            ].map(({ label, value }, index) => (
              <DetailBlock label={label} value={value} key={index} />
            ))}
          </div>
          <div className="h-96 w-96 grow-0 shrink-0">
            <AchievementLocationMap asset={activatedAsset?.test_assets ?? {}} />
          </div>
        </div>
        {/*<pre>{JSON.stringify(activatedAsset, null, 2)}</pre>*/}
      </Block>
    </PublicLayout>
  );
}
