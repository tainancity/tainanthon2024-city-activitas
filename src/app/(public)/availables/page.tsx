'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import PublicLayout from '@/components/layout';
import { Block } from '@/app/components/block';
import { DataTable } from './components/data-table';
import columns from './components/columns';

function IdleAssetsList() {
  const supabaseQuery = supabase.from('test_assets').select(
    `
    *, 
    test_agencies(id,name,note),
    test_districts(id,name)
    `,
    { count: 'exact' }
  );

  const searchParams = useSearchParams();
  const query = Object.fromEntries(new URLSearchParams(searchParams).entries());

  const filters = [];
  if (query.type) {
    filters.push(`type.eq.${query.type}`);
  }
  if (query.q) {
    filters.push(
      `type.like.%${query.q}%, section.like.%${query.q}%, address.like.%${query.q}%, target_name.like.%${query.q}%, status.like.%${query.q}%`
    );
  }

  if (filters.length) {
    supabaseQuery.or(filters.join(', '));
  }

  const [idleAssets, setIdleAssets] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchIdleAssets = async () => {
      const { data: idleAssets } = await supabaseQuery;

      setIdleAssets(idleAssets || []);
    };
    fetchIdleAssets();
  }, []);
  return <DataTable columns={columns} data={idleAssets} query={query} />;
}

export default function Page() {
  return (
    <PublicLayout>
      <Block>
        <h2 className="text-2xl font-bold">可利用空間</h2>
        <Suspense>
          <IdleAssetsList />
        </Suspense>
      </Block>
    </PublicLayout>
  );
}
