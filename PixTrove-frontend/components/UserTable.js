import RoleBadge from './RoleBadge'

export default function UserTable({ users, onRoleChange }) {
  return (
    <table className="w-full bg-card text-text rounded shadow-md mt-4">
      <thead>
        <tr className="bg-primary">
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email} className="border-b border-secondary">
            <td className="p-3">{user.email}</td>
            <td className="p-3"><RoleBadge role={user.role} /></td>
            <td className="p-3">
              <select
                value={user.role}
                onChange={e => onRoleChange(user.email, e.target.value)}
                className="bg-secondary text-text rounded px-2 py-1"
              >
                <option value="admin">Admin</option>
                <option value="cameraman">Cameraman</option>
                <option value="attendee">Attendee</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
