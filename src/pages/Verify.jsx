import React, { useState } from "react";
import axios from "axios";
import VerifyImg from "../assets/VerifyImg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Verify.css";

const Verify = () => {
  const [user_id, setUserID] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { user_id, otp };

    try {
      const response = await axios.post(
        "https://erp-backend-mqly.onrender.com/api/verifyotp/",
        data
      );

      console.log(response.data);
      if (response.data.status === 201) {
        toast.success("OTP verified! Redirecting ...");
        const token = response.data.token;
        localStorage.setItem("Token", token);
        if(response.data.role === "student"){
          setTimeout(() => {
            navigate("/sdashboard");
          }, 2000);
        }else if(response.data.role === "faculty"){
          setTimeout(() => {
            navigate("/fdashboard");
          }, 2000);
        }
      } else if (response.data.status === 401) {
        toast.error("Invalid OTP, try again");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(
        "An error occurred while verifying the OTP. Please try again later."
      );
    }
  };

  return (
    <>
      <div id="main" className="Signimage">
        <div className="VerifyLayout">
          <div className="VerifyImage">
            <img src={VerifyImg} alt="" />
          </div>
          <div className="Verify">
            <h1>OTP Verification</h1>
            <form onSubmit={handleSubmit}>
              <label>Enter your Username</label>

              <input
                className="VerifyInput"
                type="text"
                required
                value={user_id}
                placeholder="Username"
                onChange={(e) => setUserID(e.target.value)}
              />
              <br />
              <label>Enter the OTP sent on your Email</label>
              <input
                className="VerifyInput"
                id="Otp"
                type="text"
                required
                value={otp}
                placeholder="OTP"
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
