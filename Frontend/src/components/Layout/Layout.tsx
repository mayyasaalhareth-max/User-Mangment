import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext.ts";
import Navbar from "../Navbar/Navbar.tsx";

const Layout = () => {
  const { userId } = useUser();

  if (userId === null) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Background energy */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
