import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import img2 from "../assets/img2.png";
import './Forgot.css'

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const data = {
        email,
      };

      const response = await axios.post(
        "https://erp-backend-mqly.onrender.com/api/passwordreset/",
        data
      );
      const tokens = response.data.token;
      console.log(response.data);
      if (response.data.status === 201) {
        toast.success("Password reset link sent to your email");
        localStorage.setItem("Token", tokens);
        navigate("/Passconfirm");
      } else if (response.status === 401) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User Not Found");
      } else {
        console.error(error);
        toast.error("Internal Server Error");
      }
    }
  };

  return (
    <>
      <div className="Signimage">
        <div className="ForgotLayout">
          <div className="Forgot">
            <h1>Forgot Password</h1>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <button type="submit">Reset Password</button>
            </form>
            <Link to={"/"}>Back to Sign in</Link>
          </div>
          <div className="ForgotImage">
            <img src={img2} alt="" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Forgot;
