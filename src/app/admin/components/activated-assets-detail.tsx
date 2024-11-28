'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Header } from "@/components/header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as XLSX from 'xlsx';

interface SortConfig {
  key: keyof ActivatedAsset | null;
  direction: 'asc' | 'desc';
}

type ActivatedAsset = {
  id: string;
  備註: string | null;
  列入計算: string;
  土地公告現值: number;
  地址: string | null;
  地點說明: string;
  房屋課稅現值: number;
  是否補列: string;
  標的名稱: string | null;
  活化ID: number;
  活化年度: number;
  活化狀態: string;
  活化開始日期: string;
  用途類型: string;
  管理機關: string | null;
  節流效益: number;
  行政區: string | null;
  補列年度: string | null;
  計畫用途: string;
  資產ID: string | null;
  需求機關: string;
};

export function ActivatedAssetsDetailComponent() {
  const [assets, setAssets] = useState<ActivatedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [searchText, setSearchText] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<ActivatedAsset | null>(
    null
  );
  const router = useRouter();

  // 獲取資產列表
  const fetchAssets = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/activated', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch activated assets');
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching activated assets:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [router]);

  // 處理排序
  const handleSort = (key: keyof ActivatedAsset) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // 排序邏輯
  const getSortedAssets = (assets: ActivatedAsset[]) => {
    if (!sortConfig.key) return assets;

    return [...assets].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // 過濾邏輯
  const filteredAssets = assets.filter(
    (asset) =>
      searchText === '' ||
      Object.values(asset).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const sortedAssets = getSortedAssets(filteredAssets);

  const handleRowClick = (asset: ActivatedAsset) => {
    setSelectedAsset(asset);
  };

  // 添加匯出Excel功能
  const handleExportExcel = () => {
    // 準備要匯出的資料，包含所有欄位
    const exportData = sortedAssets.map((asset) => ({
      ID: asset.id,
      活化ID: asset['活化ID'],
      活化年度: asset['活化年度'],
      活化狀態: asset['活化狀態'],
      活化開始日期: asset['活化開始日期'],
      列入計算: asset['列入計算'],
      是否補列: asset['是否補列'],
      補列年度: asset['補列年度'],
      地點說明: asset['地點說明'],
      地址: asset['地址'],
      行政區: asset['行政區'],
      用途類型: asset['用途類型'],
      計畫用途: asset['計畫用途'],
      標的名稱: asset['標的名稱'],
      管理機關: asset['管理機關'],
      需求機關: asset['需求機關'],
      資產ID: asset['資產ID'],
      土地公告現值: asset['土地公告現值'],
      房屋課稅現值: asset['房屋課稅現值'],
      節流效益: asset['節流效益'],
      備註: asset['備註'],
    }));

    // 創建工作表
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '已活化資產');

    // 下載檔案
    XLSX.writeFile(wb, '已活化資產清單.xlsx');
  };

  if (isLoading) return <div>載入中...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/*<Header />*/}
      <div className="container mx-auto py-12">
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4">已活化資產詳情</h1>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-1/4 grid-cols-2 border shadow">
              <TabsTrigger value="list">已活化資產列表</TabsTrigger>
              <TabsTrigger value="add">新增資產</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="space-y-4">
                {/* 修改搜尋欄位和按鈕的容器 */}
                <div className="flex justify-between items-center">
                  <Input
                    placeholder="搜尋資產..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button onClick={handleExportExcel}>匯出Excel</Button>
                </div>

                {/* 表格 */}
                <div className="relative rounded-xl border shadow p-4 mt-2 bg-white">
                  <div className="overflow-y-scroll max-h-[70vh]">
                    <Table>
                      <TableHeader className="sticky top-0 bg-gray-100 z-10">
                        <TableRow>
                          {[
                            '活化ID',
                            '活化年度',
                            '列入計算',
                            '地點說明',
                            '用途類型',
                            '需求機關',
                            '計畫用途',
                            '活化開始日期',
                          ].map((header) => (
                            <TableHead
                              key={header}
                              className="cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleSort(header as keyof ActivatedAsset)
                              }
                            >
                              {header}
                              {sortConfig.key === header && (
                                <span>
                                  {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                                </span>
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedAssets.map((asset) => (
                          <TableRow
                            key={`${asset.id}-${asset['活化ID']}`}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRowClick(asset)}
                          >
                            <TableCell>{asset['活化ID']}</TableCell>
                            <TableCell>{asset['活化年度']}</TableCell>
                            <TableCell>{asset['列入計算']}</TableCell>
                            <TableCell>{asset['地點說明']}</TableCell>
                            <TableCell>{asset['用途類型']}</TableCell>
                            <TableCell>{asset['需求機關']}</TableCell>
                            <TableCell>{asset['計畫用途']}</TableCell>
                            <TableCell>{asset['活化開始日期']}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="add"
              className="rounded-xl border shadow p-8 mt-2 bg-white"
            >
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">資產類型</Label>
                    <Input id="type" placeholder="輸入資產類型" />
                  </div>
                  <div>
                    <Label htmlFor="agency">管理機關</Label>
                    <Input id="agency" placeholder="輸入管理機關" />
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
                  <div>
                    <Label htmlFor="activationType">活化方式</Label>
                    <Input id="activationType" placeholder="輸入活化方式" />
                  </div>
                  <div>
                    <Label htmlFor="activationStatus">活化狀態</Label>
                    <Input id="activationStatus" placeholder="輸入活化狀態" />
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
