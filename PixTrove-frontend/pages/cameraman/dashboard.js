import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function CameramanDashboard() {
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!photos.length) return setMessage('Select photos to upload.');
    const formData = new FormData();
    photos.forEach((photo) => formData.append('photos', photo));
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/event_upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setMessage(`Uploaded ${data.uploaded?.length || 0} photos!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Cameraman: Bulk Photo Upload</h1>
        <form onSubmit={handleUpload} className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <input type="file" multiple accept="image/*" onChange={handleChange} className="mb-4" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload Photos</button>
        </form>
        {message && <div className="mt-4 text-green-400">{message}</div>}
      </div>
    </div>
  );
}
