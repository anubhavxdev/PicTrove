import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

export default function CameramanUploads() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch upload history from backend when available
    setTimeout(() => {
      setUploads([]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Cameraman: Upload History</h1>
        {loading ? (
          <div>Loading...</div>
        ) : uploads.length === 0 ? (
          <div>No uploads yet.</div>
        ) : (
          <ul>
            {uploads.map((upload, i) => (
              <li key={i}>{upload}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
