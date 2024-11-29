import { UserAuthForm } from '@/app/login/components/user-auth-form';

export default function LoginPage() {
  return (
    <div className=" bg-gray-100">
      <div className="m-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[350px]">
        <UserAuthForm />
      </div>
    </div>
  );
}
