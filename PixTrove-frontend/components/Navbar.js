import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  const role = session?.user?.role
  return (
    <nav className="w-full bg-black py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-800">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-indigo-400 text-2xl font-bold tracking-wide">PixTrove</Link>
        <Link href="/about" className="text-gray-200 hover:text-indigo-400 transition">About</Link>
        <Link href="/contact" className="text-gray-200 hover:text-indigo-400 transition">Contact</Link>
      </div>
      <div className="flex gap-6 items-center">
        {session && <Link href="/dashboard" className="text-gray-200 hover:text-indigo-400 transition">Dashboard</Link>}
        {role === 'admin' && <Link href="/admin" className="text-gray-200 hover:text-indigo-400 transition">Admin</Link>}
        {!session && <Link href="/login" className="text-gray-200 hover:text-indigo-400 transition">Login</Link>}
        {!session && <Link href="/register" className="text-gray-200 hover:text-indigo-400 transition">Register</Link>}
        {session && (
          <div className="flex items-center gap-3">
            <span className="text-indigo-400 font-semibold">{session.user.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="px-3 py-1 rounded bg-indigo-400 text-black font-semibold hover:bg-black hover:text-indigo-400 border border-indigo-400 transition">Logout</button>
          </div>
        )}
      </div>
    </nav>
  )
}

