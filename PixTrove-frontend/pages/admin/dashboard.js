import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, photos: 0, unmatched: 0 });

  useEffect(() => {
    // TODO: Fetch stats from backend
    setStats({ users: 42, photos: 1234, unmatched: 7 });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-2xl">{stats.users}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Photos Sorted</h2>
            <p className="text-2xl">{stats.photos}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Unmatched Faces</h2>
            <p className="text-2xl">{stats.unmatched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
