import { createContext, useState, useEffect, useContext } from "react";
import { BASE_URL } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasPassword, setHasPassword] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setHasPassword(data.user.hasPassword);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchUser, hasPassword, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
