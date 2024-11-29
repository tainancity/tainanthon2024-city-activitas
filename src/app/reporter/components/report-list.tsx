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

export const Reports = () => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">年度</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {['113', '112', '111'].map((year, index) => (
          <TableRow
            key={index}
            onClick={() => {
              router.push('/reporter/1');
            }}
            className="cursor-pointer"
          >
            <TableCell>{year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
