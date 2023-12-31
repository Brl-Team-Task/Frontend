import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Signup.css";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      const data = {
        user_id: userId,
        password,
      };
      
      const response = await axios.post(
        "https://erp-backend-mqly.onrender.com/api/login/",
        data
      );
      if (response.data.status === 201) {
        toast.success("OTP sent to your email");
        setTimeout(() => {
          navigate("/verify");
        }, 2000);
      } else if (response.status === 400) {
        toast.error("A valid integer is required");
      } else {
        toast.error("Sign-in again");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Internal Server Error");
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="main" className="Signimage">
      <div className="header">
        <img
          src="https://www.akgec.ac.in/wp-content/themes/twentysixteen/img/AKGEC_1_0.png"
          alt=""
        />
        <p>Ajay Kumar Garg Engineering College,Ghaziabad</p>
      </div>
      <div className="SignLayout">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            placeholder="Username"
          />
          <br />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <i
              className="fa fa-regular fa-eye"
              onClick={handleShowPassword}
            ></i>
          ) : (
            <i
              className="fa-regular fa-eye-slash "
              onClick={handleShowPassword}
            ></i>
          )}
          <br />
          <Link to={`/Forgot`}>
            <p>Forgot Password?</p>
          </Link>
          <button className="submit" type="submit">
            Sign in
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
