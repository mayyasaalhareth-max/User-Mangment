import { useEffect, useState } from "react";
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
