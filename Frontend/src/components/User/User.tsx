
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
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Dashboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Choose a User
            </h1>

            <p className="mt-2 text-slate-400">
              Select a user to explore their posts and activity.
            </p>
          </div>

          {/* Users count */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 shadow-lg">
            <span className="text-sm text-slate-400">Total Users</span>
            <div className="text-2xl font-bold text-cyan-400">
              {users.length}
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => {
            const initials = user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <NavLink
                key={user.id}
                to="/posts"
                onClick={() => setUserId(Number(user.id))}
                className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-cyan-500/10"
              >
                {/* Gradient glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/30" />

                <div className="relative">

                  {/* Top row */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
                      {initials}
                    </div>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
                      #{index + 1}
                    </span>
                  </div>

                  {/* User info */}
                  <div>
                    <h2 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                      {user.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      User ID: {user.id}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                    <span className="text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-200">
                      View posts
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950">
                      →
                    </span>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Empty state */}
        {users.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
            <div className="mb-4 text-4xl">👥</div>

            <h2 className="text-xl font-semibold">
              No users found
            </h2>

            <p className="mt-2 text-slate-400">
              There are currently no users to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
