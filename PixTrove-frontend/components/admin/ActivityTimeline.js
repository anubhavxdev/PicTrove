import React from 'react';
import { Activity } from 'lucide-react';

const ActivityTimeline = () => {
  const activities = [
    { action: "New user registered", time: "2 minutes ago", type: "user" },
    { action: "100 photos processed", time: "15 minutes ago", type: "photos" },
    { action: "Face matching completed", time: "1 hour ago", type: "match" },
    { action: "System backup completed", time: "3 hours ago", type: "system" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center mb-4">
        <Activity className="w-5 h-5 text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
            <div className={`w-2 h-2 rounded-full ${
              activity.type === 'user' ? 'bg-green-400' :
              activity.type === 'photos' ? 'bg-blue-400' :
              activity.type === 'match' ? 'bg-purple-400' : 'bg-yellow-400'
            }`}></div>
            <div className="flex-1">
              <p className="text-white text-sm">{activity.action}</p>
              <p className="text-gray-500 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;