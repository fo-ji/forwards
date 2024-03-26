import Link from 'next/link';

import { LogoutButton } from '@/features/auth';

export default async function HomePage() {
  return (
    <main className="p-24">
      <h1 className="text-xl">Home（ダッシュボード）</h1>
      <div className="my-4">アナリティクスはここに表示？</div>
      <LogoutButton />
      <ul className="mt-8 space-y-4">
        <li>
          <Link href="/entry">Entry</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/projects/test">Project</Link>
        </li>
        <li>
          <Link href="/skills">Skills</Link>
        </li>
        <li>
          <Link href="/skills/test">Skill</Link>
        </li>
        <li>
          <Link href="/templates">Templates</Link>
        </li>
        <li>
          <Link href="/templates/test">Template</Link>
        </li>
        <li>
          <Link href="/users/test">User</Link>
        </li>
      </ul>
    </main>
  );
}
