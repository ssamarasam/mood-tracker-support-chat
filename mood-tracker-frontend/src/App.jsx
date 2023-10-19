import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthCheck from "./components/AuthCheck";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [login, setLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = () => {};
  const handleSignup = () => {};
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup handleSignup={handleSignup} />}
          />
          <Route path="/">
            <AuthCheck authenticated={authenticated}>
              <Dashboard userRole={userRole} />
            </AuthCheck>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
