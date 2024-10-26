import { UserAuthForm } from '@/app/login/components/user-auth-form';

export default function LoginPage() {
  return (
    <div className="m-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-md tracking-tight mb-2">台南市財稅局</h2>
        <h1 className="text-4xl font-semibold tracking-tight">CityActivitas</h1>
      </div>
      <UserAuthForm />
    </div>
  );
}
