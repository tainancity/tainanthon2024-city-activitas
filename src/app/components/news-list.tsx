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

interface News {
  date: string;
  title: string;
}

const newsList: News[] = [
  {
    date: '2024.11.09',
    title: '這是最新消息的標題',
  },
  {
    date: '2024.11.09',
    title: '這是最新消息的標題',
  },
  {
    date: '2024.11.09',
    title: '這是最新消息的標題',
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
              router.push('/');
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
