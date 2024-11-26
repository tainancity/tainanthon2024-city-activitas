import { ThemeCard, type Theme } from '@/app/components/theme-card';

const themes: Theme[] = [
  {
    tags: ['北區 實踐段', '下營區 麻豆寮段'],
    title: '新上架',
    description: '近一週上架物件',
  },
  {
    tags: ['新市區 南三舍段', '東區 立德段'],
    title: '近社區',
    description: '辦活動好方便',
  },
  {
    tags: ['歸仁區 歸仁北段'],
    title: '市場樓上',
    description: '下樓即採買',
  },
];

export const ThemeCards = () => (
  <div className="flex gap-4 w-full">
    {themes.map((theme, index) => (
      <ThemeCard key={index} theme={theme} />
    ))}
  </div>
);
