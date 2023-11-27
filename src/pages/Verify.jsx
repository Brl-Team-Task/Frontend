import React, { useState } from "react";
import axios from "axios";
import VerifyImg from "../assets/VerifyImg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Attendance from "./attendance";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, otp };

    try {
      const response = await axios.post(
        "https://erp-backend-mqly.onrender.com/api/verifyotp/",
        data
      );

      console.log(response.data);
      if (response.data.status === 201) {
        toast.success("OTP verified! Redirecting ...");
        const token = response.data.token;
        localStorage.setItem('Token', token);
        navigate("/attendance");
      } else if (response.status === 400) {
        toast.error("Invalid OTP, try again");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while verifying the OTP. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="Signimage">
        <div className="VerifyLayout">
          <div className="VerifyImage">
            <img src={VerifyImg} alt="" />
          </div>
          <div className="Verify">
            <h1>OTP Verification</h1>
            <form onSubmit={handleSubmit}>
              <label>Enter the OTP sent to the mail</label>

              <input
                className="VerifyInput"
                type="email"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>OTP:</label>
              <input
                className="VerifyInput"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <button type="submit" className="VerifyButton">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Verify;
