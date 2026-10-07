import { useState, type ReactNode } from "react";
import { UserContext } from "./UserContext.ts";

const UserProvider = (props: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;