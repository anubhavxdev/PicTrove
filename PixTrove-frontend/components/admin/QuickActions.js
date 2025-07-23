import { Image, Users, Database } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { label: "Process Photos", icon: Image, color: "from-blue-500 to-blue-600" },
    { label: "Manage Users", icon: Users, color: "from-green-500 to-green-600" },
    { label: "View Reports", icon: Database, color: "from-purple-500 to-purple-600" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${action.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white font-medium`}
          >
            <action.icon className="w-5 h-5" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;