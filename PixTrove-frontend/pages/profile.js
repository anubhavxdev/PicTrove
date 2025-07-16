import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [selfie, setSelfie] = useState(null);

  if (!session) return <div className="text-white">Please log in.</div>;

  const handleSelfieChange = (e) => {
    setSelfie(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selfie) return setMessage('Please select a selfie.');
    const formData = new FormData();
    formData.append('email', session.user.email);
    formData.append('selfie', selfie);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update_selfie`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message || 'Selfie updated!');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <label className="block mb-2">Re-upload Selfie:</label>
          <input type="file" accept="image/*" onChange={handleSelfieChange} className="mb-4" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Selfie</button>
        </form>
        {message && <div className="mt-4 text-green-400">{message}</div>}
      </div>
      <Footer />
    </div>
  );
}
