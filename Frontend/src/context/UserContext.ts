/* import { createContext } from "react";

export const UserContext = createContext(null);
 */
import { createContext, useContext } from "react";

export type UserContextType = {
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserContext.Provider");
  }
  return context;
};