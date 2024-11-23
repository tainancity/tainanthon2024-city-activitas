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
              // location text                   // 地點說明, asset的補充地點說明
              // is_supplementary boolean        // 捕列, 是否為補列
              // supplementary_year integer      // 補列年度, 例如：106、107、108
              // usage_plan text                // 計畫用途, 例如：供鹽水區公所開闢停車場使用
              // usage_type_id integer [ref: > usage_types.id]  // 計畫用途類別, 關聯到資產使用類型表
              // land_value decimal             // 土地公告現值
              // building_value decimal         // 房屋課稅現值
              // benefit_value decimal          // 節流效益(元)
              // is_counted boolean [not null]  // 列入計算: Y/M
              // note text                     // 備註
              // status varchar [not null]      // 例如：進行中、已終止 (進行中表示是活化狀態)
              // start_date date [not null]     // 活化開始日期
              // end_date date                  // 活化結束日期（若仍在進行中則為 null）
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
