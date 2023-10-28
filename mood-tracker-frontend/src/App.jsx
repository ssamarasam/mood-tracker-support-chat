import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [login, setLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated, role } = useAuth();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {};
  const handleSignup = () => {};
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={<Signup handleSignup={handleSignup} />}
          />
          <Route path="/profile" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard role={role} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard role={role} />
              ) : showLogin ? (
                <Login setLoggedIn={setLoggedIn} toggleForm={toggleForm} />
              ) : (
                <Signup setLoggedIn={setLoggedIn} toggleForm={toggleForm} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

{
  /* <Route path="/">
            <AuthCheck authenticated={authenticated}>
              <Dashboard userRole={userRole} />
            </AuthCheck>
          </Route> */
}

{
  /* <Route path="/dashboard" element={<Dashboard role={role} />} /> */
}
