'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchAssets = () => {
  const [query, setQuery] = useState({
    type: null,
    q: '',
  });
  const handleChangeType = (type) => {
    setQuery({ ...query, type });
  };
  const handleChangeSearchTerm = (searchTerm) => {
    setQuery({ ...query, q: searchTerm });
  };

  const router = useRouter();
  const handleSearch = () => {
    const queryString = new URLSearchParams(query);
    router.push(`/availables?${queryString}`);
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all" onClick={() => handleChangeType(null)}>
          全部
        </TabsTrigger>
        <TabsTrigger value="buildings" onClick={() => handleChangeType('建物')}>
          建物
        </TabsTrigger>
        <TabsTrigger value="lands" onClick={() => handleChangeType('土地')}>
          土地
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <InputWithButton
          searchTerm={query.searchTerm}
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />
      </TabsContent>
      <TabsContent value="buildings">
        <InputWithButton
          searchTerm={query.searchTerm}
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />
      </TabsContent>
      <TabsContent value="lands">
        <InputWithButton
          searchTerm={query.searchTerm}
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />
      </TabsContent>
    </Tabs>
  );
};

const InputWithButton = ({ searchTerm, onChange, onSearch }) => (
  <div className="flex items-center space-x-2 mt-4">
    <Input
      value={searchTerm}
      onChange={onChange}
      type="text"
      placeholder="關鍵字、地段、地號..."
      className="basis-full"
    />
    <Button onClick={onSearch}>搜尋可利用空間</Button>
  </div>
);
