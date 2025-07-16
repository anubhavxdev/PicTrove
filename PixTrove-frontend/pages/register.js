import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Register() {
  const [role, setRole] = useState('attendee');
  const [selfie, setSelfie] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelfieChange = (e) => {
    const file = e.target.files[0];
    setSelfie(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      if (role === 'attendee' && selfie) {
        formData.append('selfie', selfie);
      }
      // Point to Flask backend
      await axios.post('http://localhost:5000/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | PixTrove</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
        <h2 className="text-3xl font-bold mb-6 text-accent">Create Your PixTrove Account</h2>
        <form className="bg-card p-8 rounded shadow-lg w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-2 rounded bg-secondary text-text outline-none" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-2 rounded bg-secondary text-text outline-none" required />
          <select value={role} onChange={e => setRole(e.target.value)} className="px-4 py-2 rounded bg-secondary text-text outline-none">
            <option value="attendee">Attendee</option>
            <option value="cameraman">Cameraman</option>
          </select>
          {role === 'attendee' && (
            <div>
              <label className="block mb-2 text-gray-300">Upload a Selfie</label>
              <input type="file" accept="image/*" onChange={handleSelfieChange} className="block w-full text-gray-200" required />
              {preview && <img src={preview} alt="Selfie Preview" className="mt-2 rounded w-32 h-32 object-cover border-2 border-accent" />}
            </div>
          )}
          <button type="submit" className="bg-accent text-black font-semibold py-2 rounded hover:bg-primary transition" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-gray-400">Already have an account? <Link href="/login" className="text-accent underline">Login</Link></p>
      </main>
    </>
  );
}
