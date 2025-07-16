import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';

export default function Gallery() {
  const { data: session } = useSession();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    const attendee = session.user.email.split('@')[0];
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/my_photos/${attendee}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || []);
        setLoading(false);
      });
  }, [session]);

  if (!session) return <div className="text-white">Please log in.</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Event Gallery</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((url, i) => (
              <div key={i} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <img src={url} alt="Event" className="w-full h-48 object-cover" />
                <a href={url} download className="block text-blue-400 text-center py-2 hover:underline">Download</a>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
