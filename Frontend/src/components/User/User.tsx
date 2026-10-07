/* import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api.js";
import { UserContext } from "../../context/UserContext.ts";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="page-box">
      <h1>Users</h1>
      <UserContext.Consumer>
        {(context) => (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => context?.setUserId(user.id)}
                >
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </UserContext.Consumer>
    </div>
  );
};

export default User;
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchUsers } from "../../services/api.js";
import { useUser } from "../../context/UserContext.ts";
import ErrorMessage from "../ErrorMesseg/Error.tsx";
import { type UserType } from "../../types.ts";

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState("");
  const { setUserId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  const handleSelectUser = (id: number) => {
    setUserId(id); // نخزّن الـ id بالـ Context
    navigate("/posts"); // وننتقل، والـ id ما بيظهر بالـ URL
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              onClick={() => handleSelectUser(user.id)}
              className="text-emerald-700 underline hover:text-emerald-900"
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
