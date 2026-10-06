import { useState } from "react";
import User from "./components/User/User.tsx";
import { UserContext } from "./context/UserContext.ts";

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <User />
    </UserContext.Provider>
  );
};

export default App;
