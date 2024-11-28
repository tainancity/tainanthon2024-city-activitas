'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IdleAssetsFilter } from '@/app/admin/components/idle-assets-filter';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { IdleAssetsFilterSummary } from '@/app/admin/components/idle-assets-filter-summary';
import { IdleAssetTable } from '@/app/admin/components/idle-asset-table';
import dynamic from 'next/dynamic';
import { OneIdleAssetDetail } from '@/app/admin/components/one-idle-asset-detail';
import { Asset, SortConfig } from '@/app/admin/components/types';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

// const Header = dynamic(
//   () => import('@/components/header').then((mod) => mod.Header),
//   { ssr: false }
// );

export function IdleAssetsDetailComponent() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([
    'building',
    'land',
  ]);
  const [isAssetIncluded, setIsAssetIncluded] = useState(true);
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [isAgencyIncluded, setIsAgencyIncluded] = useState(true);
  const [isDistrictIncluded, setIsDistrictIncluded] = useState(true);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const fetchIdleAssets = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/idle', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch idle assets');
        }

        const data = await response.json();
        // console.log(data)
        setAssets(data);
      } catch (error) {
        console.error('Error fetching idle assets:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchIdleAssets();
  }, [router]);

  if (isLoading) {
    return <div>載入中...</div>;
  }

  // 獲取唯一的管理機關和行政區列表
  const uniqueAgencies = Array.from(
    new Set(assets.map((asset) => asset['管理機關']))
  );
  const uniqueDistricts = Array.from(
    new Set(assets.map((asset) => asset['行政區']))
  );

  const handleFilterChange = ({
    searchText,
    isAssetIncluded,
    selectedAssetTypes,
    isAgencyIncluded,
    selectedAgencies,
    isDistrictIncluded,
    selectedDistricts,
  }: {
    searchText: string;
    isAssetIncluded: boolean;
    selectedAssetTypes: string[];
    isAgencyIncluded: boolean;
    selectedAgencies: string[];
    isDistrictIncluded: boolean;
    selectedDistricts: string[];
  }) => {
    setSearchText(searchText);
    setIsAssetIncluded(isAssetIncluded);
    setSelectedAssetTypes(selectedAssetTypes);
    setIsAgencyIncluded(isAgencyIncluded);
    setSelectedAgencies(selectedAgencies);
    setIsDistrictIncluded(isDistrictIncluded);
    setSelectedDistricts(selectedDistricts);
  };

  // 修改過濾邏輯
  const filteredAssets = assets.filter((asset) => {
    // 文字搜尋過濾
    const searchResult =
      searchText === '' ||
      Object.values(asset).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      );

    // 資產類型過濾
    const assetType = asset['資產類型'];
    const isBuilding = assetType.includes('建物');
    const isLand = assetType.includes('土地');
    const matchesType =
      (isBuilding && selectedAssetTypes.includes('building')) ||
      (isLand && selectedAssetTypes.includes('land'));
    const assetTypeResult = isAssetIncluded ? matchesType : !matchesType;

    // 管理機關過濾
    const matchesAgency =
      selectedAgencies.length === 0 ||
      selectedAgencies.includes(asset['管理機關']);
    const agencyResult = isAgencyIncluded ? matchesAgency : !matchesAgency;

    // 行政區過濾
    const matchesDistrict =
      selectedDistricts.length === 0 ||
      selectedDistricts.includes(asset['行政區']);
    const districtResult = isDistrictIncluded
      ? matchesDistrict
      : !matchesDistrict;

    return searchResult && assetTypeResult && agencyResult && districtResult;
  });

  const handleSort = (key: keyof Asset) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortedAssets = (assets: Asset[]) => {
    if (!sortConfig.key) return assets;

    return [...assets].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (sortConfig.key === '建立時間') {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedAssets = getSortedAssets(filteredAssets);

  const handleRowClick = (assetId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    setSelectedAsset(asset || null);
  };

  // 添加匯出Excel功能
  const handleExportExcel = () => {
    // 依照 API 實際回傳的資料結構匯出
    const exportData = sortedAssets.map((asset) => ({
      id: asset.id,
      地址: asset['地址'],
      地段: asset['地段'],
      定位座標: asset['定位座標'],
      建立時間: asset['建立時間'],
      標的名稱: asset['標的名稱'],
      狀態: asset['狀態'],
      管理機關: asset['管理機關'],
      行政區: asset['行政區'],
      資產類型: asset['資產類型'],
    }));

    // 創建工作表
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '閒置資產');

    // 下載檔案
    XLSX.writeFile(wb, '閒置資產清單.xlsx');
  };

  if (selectedAsset) {
    return (
      <div className="min-h-screen">
        {/*<Header />*/}
        <div className="container mx-auto py-12">
          <OneIdleAssetDetail
            assetId={selectedAsset.id}
            onBack={() => setSelectedAsset(null)}
            assetData={selectedAsset}
            onUpdateSuccess={fetchIdleAssets}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/*<Header />*/}
      <div className="container mx-auto py-12">
        <div className="py-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">閒置資產共{assets.length}筆</h1>
            <Button onClick={handleExportExcel}>匯出Excel</Button>
          </div>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-1/4 grid-cols-2 border shadow">
              <TabsTrigger value="list">閒置資產列表</TabsTrigger>
              <TabsTrigger value="add">新增資產</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="space-y-4">
                <IdleAssetsFilter
                  onFilterChange={handleFilterChange}
                  agencies={uniqueAgencies}
                  districts={uniqueDistricts}
                />
                <IdleAssetsFilterSummary
                  isAssetIncluded={isAssetIncluded}
                  selectedAssetTypes={selectedAssetTypes}
                  isAgencyIncluded={isAgencyIncluded}
                  selectedAgencies={selectedAgencies}
                  isDistrictIncluded={isDistrictIncluded}
                  selectedDistricts={selectedDistricts}
                />
                <IdleAssetTable
                  assets={sortedAssets}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onRowClick={handleRowClick}
                />
              </div>
            </TabsContent>
            <TabsContent
              value="add"
              className="rounded-xl border shadow p-8 mt-2 bg-white"
            >
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">資產種類</Label>
                    <Input id="type" placeholder="輸入資產種類" />
                  </div>
                  <div>
                    <Label htmlFor="agency">機關</Label>
                    <Input id="agency" placeholder="輸入機關名稱" />
                  </div>
                  <div>
                    <Label htmlFor="district">行政區</Label>
                    <Input id="district" placeholder="輸入行政區" />
                  </div>
                  <div>
                    <Label htmlFor="section">地段</Label>
                    <Input id="section" placeholder="輸入地段" />
                  </div>
                  <div>
                    <Label htmlFor="address">地址</Label>
                    <Input id="address" placeholder="輸入地址" />
                  </div>
                  <div>
                    <Label htmlFor="name">標的名稱</Label>
                    <Input id="name" placeholder="輸入標的名稱" />
                  </div>
                </div>
                <Button type="submit">新增資產</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
