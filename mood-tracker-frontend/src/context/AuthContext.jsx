import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setRole(userData.role);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
