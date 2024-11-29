'use client';

import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/*<Header />*/}
      <div className="container mx-auto py-12">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">最新消息編輯器</h1>
            <Button className="mb-2">新增最新消息</Button>
          </div>
          <div className="relative rounded-xl border shadow p-4 mt-2 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">標題</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  '臺南市閒置市有不動產活化新進展：創新利用助推城市永續發展',
                  '臺南閒置市有不動產再出發：活化策略與未來藍圖',
                  '閒置變黃金：臺南市如何創造市有不動產新價值',
                ].map((title, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      router.push('/admin/news-editor/1');
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell>{title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
