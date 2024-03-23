import { GithubLoginButton, MailLoginButton } from '@/features/auth';

export default function Login() {
  return (
    <main className="bg-black p-24">
      <h1 className="text-gray-600">Login</h1>
      <ul className="mt-4 space-y-8">
        <li>
          <GithubLoginButton />
        </li>
        <li>
          <MailLoginButton />
        </li>
      </ul>
    </main>
  );
}
