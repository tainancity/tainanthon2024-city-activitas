'use client';

import supabase from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LogOut,
  Home,
  Briefcase,
  CheckSquare,
  Building,
  FileText,
  MapPin,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';
// import { Header } from '@/app/admin/components/header';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// 定義一個 Pastel 顏色方案
const pastelColors = [
  '#66C5CC',
  '#F6CF71',
  '#F89C74',
  '#DCB0F2',
  '#87C55F',
  '#9EB9F3',
  '#FE88B1',
  '#C9DB74',
  '#8BE0A4',
  '#B497E7',
  '#B3B3B3',
];

interface CaseTask {
  案件ID: number;
  案件名稱: string;
  資產類型: string;
  行政區: string;
  標的名稱: string;
  任務ID: number;
  執行機關: string;
  任務內容: string;
  任務狀態: string;
  開始日期: string;
  預計完成日期: string;
  實際完成日期: string;
  備註: string;
  最新會議結論: string;
}

interface AssetCase {
  案件ID: number;
  案件名稱: string;
  資產類型: string;
  行政區: string;
  標的名稱: string;
  地址: string;
  管理機關: string;
  活化目標說明: string;
  活化目標類型: string;
  案件狀態: string;
  最新會議結論: string;
  建立時間: string;
  更新時間: string;
}

interface AssetMapProps {
  title: string;
  idleAssetData: Record<string, any>;
}

export function Generator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [assetData, setAssetData] = useState({
    idle: 0,
    inProgress: 8,
    activated: 23,
  });
  const [idleAssetData, setIdleAssetData] = useState({});
  const [caseData, setCaseData] = useState({});
  const [activatedAssetData, setActivatedAssetData] = useState({});

  const [cases, setCasesTasks] = useState<CaseTask[]>([]);
  const [asset, setAssetCase] = useState<AssetCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        try {
          const [idleResponse, casesResponse, activatedResponse] =
            await Promise.all([
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/idle`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/cases`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/activated`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              ),
            ]);

          if (!idleResponse.ok || !casesResponse.ok || !activatedResponse.ok) {
            throw new Error('Failed to fetch data');
          }

          const [idleData, casesData, activatedData] = await Promise.all([
            idleResponse.json(),
            casesResponse.json(),
            activatedResponse.json(),
          ]);

          setAssetData({
            idle: idleData.length,
            inProgress: casesData.length,
            activated: activatedData.length,
          });
          setIdleAssetData(idleData);
          setCaseData(caseData);
          setActivatedAssetData(activatedData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const fetchData = async () => {
      try {
        // Fetch cases from the `asset_cases_view` table
        const { data: caseDataFromDB, error: caseError } = await supabase
          .from('case_tasks_view')
          .select('*');
        if (caseError) throw caseError;
        setCasesTasks(caseDataFromDB);

        // Fetch cases from the `asset_cases_view` table
        const { data: assetDataFromDB, error: assetError } = await supabase
          .from('asset_cases_view')
          .select('*');
        if (assetError) throw assetError;
        setAssetCase(assetDataFromDB);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto">
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <IdleAssetStackedBarChart
              title="閒置資產狀態分佈"
              icon={<CheckSquare className="h-6 w-6" />}
              inputData={idleAssetData}
            />
            <CaseStackedBarChart
              title="活化資產狀態分佈"
              icon={<CheckSquare className="h-6 w-6" />}
              inputData={cases}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
            <AssetMap title="閒置資產位置分布" idleAssetData={idleAssetData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AssetPieChart
              title="資產狀態總覽"
              icon={<Home className="h-6 w-6" />}
              inputData={assetData}
              colors={pastelColors}
            />

            <AssetStatusPieChart
              title="活化案件狀態分布"
              icon={<Home className="h-6 w-6" />}
              inputData={asset}
              colors={pastelColors}
            />
            <AssetTypePieChart
              title="活化資產活化目標類型比例"
              icon={<Home className="h-6 w-6" />}
              inputData={asset}
              colors={pastelColors}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function AssetPieChart({ title, icon, inputData, colors }) {
  const chartData = [
    {
      values: [inputData.idle, inputData.inProgress, inputData.activated],
      labels: ['閒置', '進行中', '已活化'],
      type: 'pie',
      hole: 0.3, // Creates a donut chart
      marker: {
        colors: [colors[0], colors[1], colors[2]],
      },
    },
  ];

  const layout = {
    height: 500,
    margin: { t: 0, b: 0, l: 0, r: 0 },
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.2,
      xanchor: 'center',
      x: 0.5,
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Plot
          data={chartData}
          layout={layout}
          config={{ displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}

function AssetStatusPieChart({ title, icon, inputData, colors }) {
  // Count occurrences of each status
  const statusCounts = inputData.reduce(
    (acc, item) => {
      acc[item.案件狀態] = (acc[item.案件狀態] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = [
    {
      values: Object.values(statusCounts),
      labels: Object.keys(statusCounts),
      type: 'pie',
      hole: 0.3, // Creates a donut chart
      marker: {
        colors: colors.slice(0, Object.keys(statusCounts).length),
      },
    },
  ];

  const layout = {
    height: 500,
    margin: { t: 0, b: 0, l: 0, r: 0 },
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.2,
      xanchor: 'center',
      x: 0.5,
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Plot
          data={chartData}
          layout={layout}
          config={{ displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}

function AssetTypePieChart({ title, icon, inputData, colors }) {
  // Count occurrences of each status
  const statusCounts = inputData.reduce(
    (acc, item) => {
      acc[item.活化目標類型] = (acc[item.活化目標類型] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = [
    {
      values: Object.values(statusCounts),
      labels: Object.keys(statusCounts),
      type: 'pie',
      hole: 0.3, // Creates a donut chart
      marker: {
        colors: colors.slice(0, Object.keys(statusCounts).length),
      },
    },
  ];

  const layout = {
    height: 500,
    margin: { t: 0, b: 0, l: 0, r: 0 },
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.2,
      xanchor: 'center',
      x: 0.5,
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Plot
          data={chartData}
          layout={layout}
          config={{ displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}

function IdleAssetStackedBarChart({ title, icon, inputData }) {
  const processData = () => {
    const assetTypes = [
      ...new Set(Object.values(inputData).map((item) => item.資產類型)),
    ];
    const districts = [
      ...new Set(Object.values(inputData).map((item) => item.行政區)),
    ];

    const data = assetTypes.map((type) => {
      return {
        y: districts,
        x: districts.map(
          (district) =>
            Object.values(inputData).filter(
              (item) => item.行政區 === district && item.資產類型 === type
            ).length
        ),
        name: type,
        orientation: 'h',
        type: 'bar',
        marker: {
          color: pastelColors[assetTypes.indexOf(type) % pastelColors.length],
        },
      };
    });

    return data;
  };

  const chartData = processData();

  const layout = {
    height: 500,
    margin: { t: 30, b: 50, l: 100, r: 50 },
    barmode: 'stack',
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 },
    xaxis: { title: '數量' },
    yaxis: { title: '行政區', automargin: true },
    title: '閒置資產分布',
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Plot
          data={chartData}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}

function CaseStackedBarChart({ title, icon, inputData }) {
  const processData = () => {
    const assetTypes = [
      ...new Set(Object.values(inputData).map((item) => item.任務狀態)),
    ];
    const agencies = [
      ...new Set(Object.values(inputData).map((item) => item.執行機關)),
    ];

    const data = assetTypes.map((type) => {
      return {
        y: agencies,
        x: agencies.map(
          (agencie) =>
            Object.values(inputData).filter(
              (item) => item.執行機關 === agencie && item.任務狀態 === type
            ).length
        ),
        name: type,
        orientation: 'h',
        type: 'bar',
        marker: {
          color: pastelColors[assetTypes.indexOf(type) % pastelColors.length],
        },
      };
    });

    return data;
  };

  const chartData = processData();

  const layout = {
    height: 500,
    margin: { t: 30, b: 50, l: 100, r: 50 },
    barmode: 'stack',
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 },
    xaxis: { title: '數量' },
    yaxis: { title: '執行機關', automargin: true },
    title: '活化資產狀態分佈',
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Plot
          data={chartData}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}

const AssetMap: React.FC<AssetMapProps> = ({ title, idleAssetData }) => {
  const processData = () => {
    const data = Object.values(idleAssetData);
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    const texts: string[] = [];
    const colors: string[] = [];

    data.forEach((asset) => {
      if (asset.id == 45 || asset.id == 22) {
        return;
      }

      const [lat, lng] = asset.定位座標
        ? asset.定位座標.replace(/[()]/g, '').split(',').map(Number)
        : [0, 0]; // 默認值設為台南市中心附近

      if (lat == 0 && lng == 0) {
        return;
      }

      latitudes.push(lat);
      longitudes.push(lng);
      texts.push(
        `${asset.標的名稱}<br>類型: ${asset.資產類型}<br>地址: ${asset.地址}`
      );

      // 根據資產類型設置不同的顏色
      switch (asset.資產類型) {
        case '建物':
          colors.push('red');
          break;
        case '土地':
          colors.push('green');
          break;
        default:
          colors.push('blue');
      }
    });

    return { latitudes, longitudes, texts, colors };
  };

  const { latitudes, longitudes, texts, colors } = processData();

  const data = [
    {
      type: 'scattermap',
      lat: latitudes,
      lon: longitudes,
      mode: 'markers',
      marker: {
        size: 14,
        color: colors,
      },
      text: texts,
      hoverinfo: 'text',
    },
  ];

  const layout = {
    dragmode: 'zoom',
    map: {
      bearing: 0,
      center: {
        lat: 23.03648916564671,
        lon: 120.2475179266987,
      }, // 台南市中心附近

      style: 'light',
      zoom: 10,
    },
    showlegend: false,
    height: 500,
    margin: { l: 0, r: 0, t: 0, b: 0 },
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <MapPin className="h-6 w-6" />
      </CardHeader>
      <CardContent>
        <Plot
          data={data}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
};
