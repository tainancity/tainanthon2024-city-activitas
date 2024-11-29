'use client';

import { useRouter } from 'next/navigation';
import Tiptap from '@/components/ui/tiptap';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className="mx-auto my-12 p-6 bg-white rounded-2xl max-w-4xl">
      <Tiptap />
      <div className="flex justify-end">
        <Button
          onClick={() => {
            router.push('/admin/achievement-editor');
          }}
        >
          儲存
        </Button>
      </div>
    </div>
  );
}
