import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchAssets = () => (
  <Tabs defaultValue="all" className="w-full">
    <TabsList>
      <TabsTrigger value="all">全部</TabsTrigger>
      <TabsTrigger value="buildings">建物</TabsTrigger>
      <TabsTrigger value="lands">土地</TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <InputWithButton />
    </TabsContent>
    <TabsContent value="buildings">
      <InputWithButton />
    </TabsContent>
    <TabsContent value="lands">
      <InputWithButton />
    </TabsContent>
  </Tabs>
);

const InputWithButton = () => (
  <div className="flex items-center space-x-2 mt-4">
    <Input
      type="text"
      placeholder="關鍵字、地段、地號..."
      className="basis-full"
    />
    <Button type="submit">搜尋可利用空間</Button>
  </div>
);
