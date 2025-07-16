import Head from 'next/head'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <>
      <Head>
        <title>Login | PixTrove</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
        <h2 className="text-3xl font-bold mb-6 text-accent">Login to PixTrove</h2>
        <form className="bg-card p-8 rounded shadow-lg w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-2 rounded bg-secondary text-text outline-none" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-2 rounded bg-secondary text-text outline-none" required />
          <button type="submit" className="bg-accent text-black font-semibold py-2 rounded hover:bg-primary transition">Login</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-gray-400">Don&apos;t have an account? <Link href="/register" className="text-accent underline">Register</Link></p>
      </main>
    </>
  )
}
