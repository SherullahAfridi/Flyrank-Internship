import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white shadow">
      <nav className="max-w-6xl mx-auto flex gap-6 p-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/health">Health</Link>
      </nav>
    </header>
  );
}