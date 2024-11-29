'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Block } from '@/app/components/block';
import { ReportAssetForm } from '@/app/components/report-asset-form';

function Page() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Block>
      <ReportAssetForm
        onSubmitSuccess={() => {
          toast({
            title: '您的提案已送出！',
          });
          router.push('/reporter');
        }}
      />
    </Block>
  );
}

export default Page;
