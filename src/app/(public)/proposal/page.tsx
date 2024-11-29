'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import PublicLayout from '@/components/layout';
import { Block } from '@/app/components/block';
import { RequestAssetForm } from '@/app/components/request-asset-form';

function Page() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <PublicLayout>
      <Block>
        <RequestAssetForm
          onSubmitSuccess={() => {
            toast({
              title: '您的提案已送出！',
            });
            router.push('/');
          }}
        />
      </Block>
    </PublicLayout>
  );
}

export default Page;
