import PublicLayout from '@/components/layout';
import { Block } from '@/app/components/block';
import FeedbackForm from './components/feedback-form';

export default function Page() {
  return (
    <PublicLayout>
      <Block>
        <FeedbackForm />
      </Block>
    </PublicLayout>
  );
}
