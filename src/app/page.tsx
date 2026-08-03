import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        Frontend AI Engineering
      </h1>

      <p>Capstone Skeleton - Week 3</p>

      <nav className="flex gap-6">
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/health">Health</Link>
      </nav>
    </main>
  );
}