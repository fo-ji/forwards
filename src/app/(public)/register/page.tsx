import { GithubLoginButton, MailLoginButton } from '@/features/auth';

export default function RegisterPage() {
  return (
    <main className="p-24">
      <h1 className="text-xl">Register</h1>
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
