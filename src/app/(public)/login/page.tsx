import { GithubLoginButton, MailLoginButton } from '@/features/auth';

export default function LoginPage() {
  return (
    <main className="p-24">
      <h1 className="text-xl">Login</h1>
      <ul className="my-4 space-y-8">
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
