import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { z } from "zod";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(3, "Enter atleast 8 characters").max(15),
});

const Login = ({ toggleForm }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErros] = useState({
    email: "",
    password: "",
  });
  const { login, setUser, setIsAuthenticated, setRole } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const clearErrorMessage = (e) => {
    const { name, value } = e.target;

    setFormErros({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: "",
      password: "",
    };
    loginData.email = emailRef.current.value;
    loginData.password = passwordRef.current.value;

    try {
      const validateFormData = loginSchema.parse(loginData);
      // console.log("after validate form data: ", validateFormData);
      const URL = "http://localhost:3000" + "/auth/login";
      console.log("url: ", URL);
      const response = await axios.post(URL, {
        email: loginData.email,
        password: loginData.password,
      });
      console.log("res: ", response);
      if (response.data.token) {
        console.log(
          "got token from backend successfully: ",
          response.data.token
        );
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        console.log("user: ", decodedToken.user);
        localStorage.setItem("token", token);
        login(decodedToken.user);
        navigate("/dashboard");
        // setUser(response.data.user);
        // setIsAuthenticated(true);
        // setRole(response.data.user.role);
      } else {
        console.log("login failed");
      }
    } catch (err) {
      console.log("Error while logging: ", err);
      if (err.errors) {
        const listOfErrors = {};
        for (let formFieldErr of err.errors) {
          if (formFieldErr.path) {
            listOfErrors[formFieldErr.path[0]] = formFieldErr.message;
          }
        }

        setFormErros({ ...listOfErrors });
        setErrorMessage("Check all the fields and enter valid input");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
            name="email"
            className=""
            placeholder="enter email address"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className=""
            placeholder="enter password"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div className="">
          <div className="">
            <button type="submit">Login</button>
          </div>
          <button onClick={toggleForm}>Toggle to Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
