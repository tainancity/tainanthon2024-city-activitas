import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Theme {
  tags: string[];
  title: string;
  description: string;
}

export const ThemeCard = ({ theme }: { theme: Theme }) => (
  <Card className="flex-grow cursor-pointer">
    <Link href="/availables">
      <CardHeader>
        <div className="mb-2 flex gap-1">
          {theme.tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>
        <CardTitle>{theme.title}</CardTitle>
        <CardDescription>{theme.description}</CardDescription>
      </CardHeader>
    </Link>
  </Card>
);
