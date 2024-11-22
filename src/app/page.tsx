import PublicLayout from '@/components/layout';
import { AchievementsCarousel } from '@/app/components/achievements-carousel';
import { SearchAssets } from '@/app/components/search-assets';
import { ThemeCards } from '@/app/components/theme-cards';
import { NewsList } from '@/app/components/news-list';
import { Block } from '@/app/components/block';

export default function Home() {
  return (
    <PublicLayout>
      <Block>
        <div className="flex items-center justify-between space-y-2">
          <AchievementsCarousel />
        </div>
      </Block>
      <Block>
        <h2 className="text-2xl font-bold">找空間</h2>
        <div className="flex items-center justify-between space-y-2">
          <SearchAssets />
        </div>
      </Block>
      <Block>
        <h2 className="text-2xl font-bold">主題空間</h2>
        <div className="flex items-center justify-between space-y-2">
          <ThemeCards />
        </div>
      </Block>
      <Block>
        <h2 className="text-2xl font-bold">最新消息</h2>
        <div className="flex items-center justify-between space-y-2">
          <NewsList />
        </div>
      </Block>
    </PublicLayout>
  );
}
