import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchUsers } from "../../services/api.ts";
import { useUser } from "../../context/UserContext.ts";
import ErrorMessage from "../ErrorMesseg/Error.tsx";
import { type UserType } from "../../types.ts";

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState("");
  const { setUserId } = useUser();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <NavLink
              to="/posts"
              onClick={() => setUserId(Number(user.id))} 
              className="text-emerald-700 underline hover:text-emerald-900"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;