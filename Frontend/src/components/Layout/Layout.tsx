import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext.ts";
import Navbar from "../Navbar/Navbar.tsx";

const Layout = () => {
  const { userId } = useUser();

  //بدون هالـ guard رح تعمل fetch بـ userId=null وبتطلع صفحة فاضية.
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