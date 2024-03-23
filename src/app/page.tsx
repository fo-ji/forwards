import { LogoutButton } from '@/features/auth';

export default async function Home() {
  return (
    <main className="bg-black p-24">
      <h1 className="text-gray-600">Home</h1>
      <LogoutButton />
    </main>
  );
}
