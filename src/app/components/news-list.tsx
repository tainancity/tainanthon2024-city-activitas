'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

export interface News {
  date: string;
  title: string;
}

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
];

export const NewsList = () => {
  const router = useRouter();

  return (
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
  );
};
