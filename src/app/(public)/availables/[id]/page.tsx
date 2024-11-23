'use client';

import { useParams } from 'next/navigation';
import { AvailablesCarousel } from '@/app/components/availables-carousel';
import { Block } from '@/app/components/block';
import PublicLayout from '@/components/layout';

export default function Page() {
  const { id } = useParams();

  const [asset, setAsset] = useState<unknown>({});

  useEffect(() => {
    const fetchAsset = async () => {
      const { data: asset } = await supabase
        .from('test_assets')
        .select(
          `
          *, 
          test_building_details(*),
          test_land_details(*),
          test_agencies(*),
          test_districts(*)
          `
        )
        .eq('id', id)
        .single();
      setAsset(asset);
    };
    fetchAsset();
  }, [id]);

  const getDetails = () => {
    switch (asset?.type) {
      case '建物':
        return (
          <div className="w-full mb-12 flex flex-col gap-4">
            <h3 className="mb-6 text-3xl">{asset?.type}詳情</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: '使用分區',
                  value: asset?.test_building_details?.[0]?.zone_type,
                },
                {
                  label: '土地用途',
                  value: asset?.test_building_details?.[0]?.land_use,
                },
                {
                  label: '建物種類',
                  value: asset?.test_building_details?.[0]?.building_type,
                },
                {
                  label: '建號',
                  value: asset?.test_building_details?.[0]?.building_number,
                },
                {
                  label: '現況',
                  value: asset?.test_building_details?.[0]?.current_status,
                },
                {
                  label: '空置比率',
                  value: asset?.test_building_details?.[0]?.vacancy_rate,
                },
              ].map((detail, index) => (
                <DetailBlock
                  label={detail.label}
                  value={detail.value}
                  key={index}
                />
              ))}
            </div>
            <DetailBlock
              label="樓地板面積 (平方公尺)"
              value={asset?.test_building_details?.[0]?.floor_area}
            />
            <DetailBlock
              label="備註"
              value={asset?.test_building_details?.[0]?.note}
            />
          </div>
        );
      case '土地':
        return (
          <div className="w-full mb-12 flex flex-col gap-4">
            <h3 className="mb-6 text-3xl">{asset?.type}詳情</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: '使用分區',
                  value: asset?.test_land_details?.[0]?.zone_type,
                },
                {
                  label: '土地用途',
                  value: asset?.test_land_details?.[0]?.land_use,
                },
                {
                  label: '面積 (平方公尺)',
                  value: asset?.test_land_details?.[0]?.area,
                },
                {
                  label: '地號',
                  value: asset?.test_land_details?.[0]?.lot_number,
                },
                {
                  label: '現況',
                  value: asset?.test_land_details?.[0]?.current_status,
                },
                {
                  label: '空置比率',
                  value: asset?.test_land_details?.[0]?.vacancy_rate,
                },
              ].map((detail, index) => (
                <DetailBlock
                  label={detail.label}
                  value={detail.value}
                  key={index}
                />
              ))}
            </div>
            <DetailBlock
              label="備註"
              value={asset?.test_land_details?.[0]?.note}
            />
          </div>
        );
      default:
        return <div className="w-full mb-12 flex flex-col gap-4"></div>;
    }
  };

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
          <AvailablesCarousel />
        </div>
      </Block>
      <Block>
        <h2 className="text-2xl font-bold">{id}</h2>
        <div className="flex items-center justify-between space-y-2">
          {/* TODO */}
        </div>
      </Block>
    </PublicLayout>
  );
}
