import Navbar from '../../components/Navbar';

export default function AdminUnmatched() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Unmatched Faces</h1>
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <p>Review and manually categorize unmatched faces here. (Feature coming soon!)</p>
        </div>
      </div>
    </div>
  );
}
