import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full bg-gray-900 rounded-lg">
            <thead>
              <tr>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Selfie</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">{u.selfie_path ? <img src={u.selfie_path} alt="Selfie" className="w-12 h-12 rounded-full" /> : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
