import { Navbar } from '@/app/components/navbar';
import { Search } from '@/app/components/search';
import { AchievementsCarousel } from '@/app/components/achievements-carousel';
import { SearchAssets } from '@/app/components/search-assets';
import { ThemeCards } from '@/app/components/theme-cards';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
            <div className="mx-4">
              <h1 className="text-2xl font-bold">CityActivitas</h1>
            </div>
            <Navbar />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <Button>登入</Button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 mx-auto max-w-screen-xl min-w-[1280px]">
          <div className="flex items-center justify-between space-y-2">
            <AchievementsCarousel />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 mx-auto max-w-screen-xl min-w-[1280px]">
          <h2 className="text-2xl font-bold">找空間</h2>
          <div className="flex items-center justify-between space-y-2">
            <SearchAssets />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 mx-auto max-w-screen-xl min-w-[1280px]">
          <h2 className="text-2xl font-bold">主題空間</h2>
          <div className="flex items-center justify-between space-y-2">
            <ThemeCards />
          </div>
        </div>
      </div>
    </>
  );
}
