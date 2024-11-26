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
import PublicLayout from '@/components/layout';
import { Block } from '@/app/components/block';
import { News } from '@/app/components/news-list';

export default function Page() {
  const newsList: News[] = [
    {
      date: '2024.11.09',
      title: '臺南市閒置市有不動產活化新進展：創新利用助推城市永續發展',
    },
    {
      date: '2024.11.09',
      title: '臺南閒置市有不動產再出發：活化策略與未來藍圖',
    },
    {
      date: '2024.11.09',
      title: '閒置變黃金：臺南市如何創造市有不動產新價值',
    },
    {
      date: '2024.11.09',
      title: '臺南市閒置空間大變身：多元利用創造雙贏',
    },
    {
      date: '2024.11.09',
      title: '從閒置到活化：臺南市不動產的華麗轉型之路',
    },
    {
      date: '2024.11.09',
      title: '公私協力推動：臺南市市有不動產活化成果揭密',
    },
    {
      date: '2024.11.09',
      title: '閒置市有地的逆襲：臺南市活化計畫帶來新氣象',
    },
    {
      date: '2024.11.09',
      title: '臺南市政府新作為：閒置市有不動產活化助城市升級',
    },
    {
      date: '2024.11.09',
      title: '城市更新的關鍵一步：臺南閒置不動產活化的成效與挑戰',
    },
    {
      date: '2024.11.09',
      title: '創新與永續並進：臺南閒置市有資產的全新定位',
    },
    {
      date: '2024.11.09',
      title: '臺南閒置空間新生機：從土地到地標的轉變之道',
    },
  ];

  const router = useRouter();

  return (
    <PublicLayout>
      <Block>
        <h2 className="text-2xl font-bold">最新消息</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">日期</TableHead>
              <TableHead>標題</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.map((news, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  router.push('/news/1');
                }}
                className="cursor-pointer"
              >
                <TableCell>{news.date}</TableCell>
                <TableCell>{news.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Block>
    </PublicLayout>
  );
}
