import Head from 'next/head'
import { useState, useEffect } from 'react'
import UserTable from '../components/UserTable'
import axios from 'axios'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('http://localhost:5000/users')
        setUsers(res.data)
      } catch (err) {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleRoleChange = async (email, newRole) => {
    setMessage(null)
    setError(null)
    const user = users.find(u => u.email === email)
    if (!user) return
    try {
      await axios.post(`http://localhost:5000/users/${user.id}/role`, { role: newRole })
      setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u))
      setMessage('Role updated!')
    } catch (err) {
      setError('Failed to update role')
    }
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | PixTrove</title>
      </Head>
      <main className="min-h-screen bg-background text-text p-8">
        <h2 className="text-3xl font-bold mb-6 text-accent">Admin Dashboard</h2>
        <p className="mb-4">Assign roles to users and manage event participants.</p>
        {loading && <div className="text-accent">Loading users...</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-500 mb-2">{message}</div>}
        {!loading && !error && <UserTable users={users} onRoleChange={handleRoleChange} />}
      </main>
      <Footer />
    </>
  )
}
