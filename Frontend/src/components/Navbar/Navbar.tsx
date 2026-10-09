import { NavLink, useNavigate } from "react-router";
import { useUser } from "../../context/UserContext.ts";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `
    group relative flex items-center gap-2
    rounded-xl px-3 py-2
    text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? "bg-cyan-400/10 text-cyan-400 shadow-sm shadow-cyan-500/5"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }
  `;

const Navbar = () => {
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserId(null);
    navigate("/");
  };

  return (
    <nav
      className="
        sticky top-0 z-40 w-full
        border-b border-slate-800
        bg-slate-950/90
        shadow-lg shadow-black/10
        backdrop-blur-xl
      "
      dir="ltr"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">


        {/* Navigation */}
        <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto">
          <NavLink to="/posts" className={linkClass}>
            <span>Posts</span>
          </NavLink>

          <NavLink to="/my-posts" className={linkClass}>
            <span>My Posts</span>
          </NavLink>

          <NavLink to="/my-albums" className={linkClass}>
            <span>Albums</span>
          </NavLink>

          <NavLink to="/my-photos" className={linkClass}>
            <span>Photos</span>
          </NavLink>

          <NavLink to="/my-todos" className={linkClass}>
            <span>Todos</span>
          </NavLink>
        </div>

        {/* Switch user */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            shrink-0 rounded-xl
            border border-red-400/10
            bg-red-400/5
            px-3 py-2
            text-sm font-medium
            text-red-400
            transition-all duration-200
            hover:border-red-400/30
            hover:bg-red-400/10
            hover:text-red-300
          "
        >
          <span className="hidden sm:inline">Switch user</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
