import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

function CameramanPanel() {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => setFiles([...e.target.files])
  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)
    setMessage(null)
    const formData = new FormData()
    files.forEach(f => formData.append('photos', f))
    try {
      await axios.post('http://localhost:5000/event_upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Upload successful!')
    } catch (err) {
      setMessage('Upload failed.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Cameraman Panel</h3>
      <div className="bg-card p-6 rounded shadow-lg mb-4">
        <p className="mb-2">Upload event photos for face recognition and sorting.</p>
        <input type="file" multiple className="block w-full text-gray-200 mb-2" onChange={handleChange} />
        <button className="bg-accent text-black px-4 py-2 rounded hover:bg-primary" onClick={handleUpload} disabled={loading}>{loading ? 'Uploading...' : 'Upload Photos'}</button>
        {message && <div className="mt-2 text-accent">{message}</div>}
      </div>
    </section>
  )
}

function AttendeePanel({ session }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const name = session.user.email.split('@')[0]
  const selfieUrl = session.user.selfie_path ? `http://localhost:5000/selfies/${session.user.selfie_path.split(/[\\/]/).pop()}` : null
  const fetchPhotos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`http://localhost:5000/my_photos/${name}`)
      setPhotos(res.data.photos)
    } catch (err) {
      setError('Could not fetch photos')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Attendee Panel</h3>
      <div className="bg-card p-6 rounded shadow-lg mb-4">
        <p className="mb-2">View your uploaded selfie and your organized event photos.</p>
        {selfieUrl ? (
          <img src={selfieUrl} alt="Your Selfie" className="rounded w-32 h-32 object-cover border-2 border-accent mb-4" />
        ) : <div className="w-32 h-32 bg-secondary rounded mb-4 flex items-center justify-center text-gray-400">No Selfie</div>}
        <button className="bg-accent text-black px-4 py-2 rounded hover:bg-primary" onClick={fetchPhotos} disabled={loading}>{loading ? 'Loading...' : 'View My Photos'}</button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {photos.map(photo => (
              <img key={photo} src={`http://localhost:5000/organized/${name}/${photo}`} alt={photo} className="rounded shadow border border-secondary" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background text-text">Loading...</div>
  }
  if (!session) {
    if (typeof window !== 'undefined') signIn()
    return null
  }
  const role = session.user.role
  return (
    <>
      <Head>
        <title>Dashboard | PixTrove</title>
      </Head>
      <main className="min-h-screen bg-background text-text p-8">
        <h2 className="text-3xl font-bold mb-6 text-accent">Dashboard</h2>
        {role === 'admin' && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Admin Panel</h3>
            <div className="bg-card p-6 rounded shadow-lg mb-4">
              <p className="mb-2">Assign roles to users, manage attendees and cameramen.</p>
              <button className="bg-accent text-black px-4 py-2 rounded hover:bg-primary" onClick={() => router.push('/admin')}>Manage Users</button>
            </div>
          </section>
        )}
        {role === 'cameraman' && (
          <CameramanPanel />
        )}
        {role === 'attendee' && (
          <AttendeePanel session={session} />
        )}
      </main>
      <Footer />
    </>
  )
}
