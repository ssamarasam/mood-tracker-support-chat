import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [healthcareProfessionalUserId, setHealthcareProfessionalUserId] =
    useState(null);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setRole(userData.role);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRole("");
    setHealthcareProfessionalUserId(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const URL = backendURL + "/user-profile/get-healthcareProfessional";
    console.log("healfetch url: ", URL);
    if (isAuthenticated && role === "Patient") {
      axios
        .get(URL)
        .then((response) => {
          console.log("get health care success FE: ", response.data);
          setHealthcareProfessionalUserId(response.data.id);
        })
        .catch((err) => {
          console.log("error fetching health - FE");
        });
    }
  }, [isAuthenticated, role]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        healthcareProfessionalUserId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
