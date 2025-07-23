import { useEffect, useState } from 'react';
import { Users, Image, AlertTriangle, Database } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StatCard from '../../components/admin/StatCard';
import ActivityTimeline from '../../components/admin/ActivityTimeline';
import QuickActions from '../../components/admin/QuickActions'; 

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, photos: 0, unmatched: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStats({ users: 42, photos: 1234, unmatched: 7 });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      trend: 12,
      color: "from-blue-500 to-blue-600",
      description: "Active users this month"
    },
    {
      title: "Photos Sorted",
      value: stats.photos,
      icon: Image,
      trend: 8,
      color: "from-green-500 to-green-600",
      description: "Successfully processed"
    },
    {
      title: "Unmatched Faces",
      value: stats.unmatched,
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      description: "Requiring attention"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Welcome back! Here's what's happening with PicTrove today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              trend={card.trend}
              color={card.color}
              description={card.description}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Secondary content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityTimeline />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}