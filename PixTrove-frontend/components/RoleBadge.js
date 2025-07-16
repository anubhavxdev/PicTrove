export default function RoleBadge({ role }) {
  const color = role === 'admin' ? 'bg-accent text-black' : role === 'cameraman' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white';
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color} uppercase`}>
      {role}
    </span>
  );
}
