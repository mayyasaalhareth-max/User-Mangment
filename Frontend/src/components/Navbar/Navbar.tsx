/* const Navbar = (props) => {
  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-xs"
      dir="ltr"
    >
      <div className="flex w-full items-center justify-between px-4 py-3.5 sm:px-8">
        <button
          type="button"
          onClick={props.onHome}
          className="text-xl font-bold text-gray-900 hover:text-emerald-700"
        >
          User Management
        </button>
        <span className="text-sm text-gray-500">Users</span>
      </div>
    </nav>
  );
};

export default Navbar;
 */

import { NavLink, useNavigate } from "react-router";
import { useUser } from "../../context/UserContext.ts";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "font-bold text-emerald-700"
    : "text-gray-600 hover:text-emerald-700";

const Navbar = () => {
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserId(null);
    navigate("/");
  };

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-xs"
      dir="ltr"
    >
      <div className="flex w-full items-center justify-between px-4 py-3.5 sm:px-8">
        <div className="flex gap-6">
          <NavLink to="/posts" className={linkClass}>
            All Posts
          </NavLink>
          <NavLink to="/my-posts" className={linkClass}>
            My Posts
          </NavLink>
          <NavLink to="/my-albums" className={linkClass}>
            My Albums
          </NavLink>
          <NavLink to="/my-photos" className={linkClass}>
            My Photos
          </NavLink>
          <NavLink to="/my-todos" className={linkClass}>
            My Todos
          </NavLink>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Switch user
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
