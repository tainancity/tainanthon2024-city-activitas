import { ThemeCard, type Theme } from '@/app/components/theme-card';

const themes: Theme[] = [
  {
    tags: ['x', 'y'],
    title: '主題',
    description: '這是主題的描述',
  },
  {
    tags: ['x', 'y'],
    title: '主題',
    description: '這是主題的描述',
  },
  {
    tags: ['x', 'y'],
    title: '主題',
    description: '這是主題的描述',
  },
];

export const ThemeCards = () => (
  <div className="flex gap-4 w-full">
    {themes.map((theme, index) => (
      <ThemeCard key={index} theme={theme} />
    ))}
  </div>
);
