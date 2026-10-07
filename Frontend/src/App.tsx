import User from "./components/User/User.tsx";

/* const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <User />
    </UserContext.Provider>
  );
}; */
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout.tsx";
import AllPosts from "./pages/AllPosts.tsx";
import MyPosts from "./pages/MyPosts.tsx";
import MyAlbums from "./pages/MyAlbums.tsx";
import MyTodos from "./pages/MyTodos.tsx";
import UserProvider from "./context/UserProvider.tsx";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        {/* الصفحة الأولى: قائمة اليوزرز */}
        <Route path="/" element={<User />} />

        {/* صفحات فيها Navbar، وكلها بتمرّ على الـ guard */}
        <Route element={<Layout />}>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-albums" element={<MyAlbums />} />
          <Route path="/my-todos" element={<MyTodos />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
