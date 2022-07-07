import { useState, createContext } from "react";

export const UserContext = createContext({
  user: {},
  isLoggedin: false,
  isAdmin: false,
  setUser: () => {},
  setIsLoggedin: () => {},
  setIsAdmin: () => {},
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedin,
        isAdmin,
        setUser,
        setIsLoggedin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
