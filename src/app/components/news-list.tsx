import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export const NewsList = () => (
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[160px] text-right">日期</TableHead>
        <TableHead>標題</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {newsList.map((news, index) => (
        <TableRow key={index}>
          <TableCell className="text-right">{news.date}</TableCell>
          <TableCell>{news.title}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
