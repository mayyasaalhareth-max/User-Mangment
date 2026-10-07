import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext.ts";
import Navbar from "../Navbar/Navbar.tsx";

const Layout = () => {
  const { userId } = useUser();

  
  if (userId === null) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;