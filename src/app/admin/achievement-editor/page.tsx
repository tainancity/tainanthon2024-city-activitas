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
            <h1 className="text-2xl font-bold mb-4">媒合成果編輯器</h1>
            <Button className="mb-2">新增媒合成果</Button>
          </div>
          <div className="relative rounded-xl border shadow p-4 mt-2 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">標的名稱</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['舊安南地政事務所', '東門派出所', '原臺南縣團管區'].map(
                  (targetName, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        router.push('/admin/achievement-editor/1');
                      }}
                      className="cursor-pointer"
                    >
                      <TableCell>{targetName}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
