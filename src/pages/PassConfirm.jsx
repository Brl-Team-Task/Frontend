import React, { useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Desktop from "../assets/Desktop.png";
import './PassConfirm.css'

const PassConfirm = () => {
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirm_password, setShowconfirm_password] = useState(false);
  const navigate = useNavigate();
  const isPasswordsMatch = password === confirm_password;

  const handleShowpassword = () => {
    setShowpassword((prev) => !prev);
  };

  const handleShowconfirm_password = () => {
    setShowconfirm_password((prev) => !prev);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirm_password) {
      toast.error("Please enter both new password and confirm password");
      return;
    }

    if ((password.length || confirm_password.length) < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!isPasswordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("Token");

    try {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const response = await axios.patch(
        "https://erp-backend-mqly.onrender.com/api/password/reset/",{
          password : password,
          confirm_password : confirm_password,
          token : token
        }
      );

      if (response.data.status === 201) {
        toast.success("Password successfully reset! Sign-in again");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = response.data;
        toast.error(errorData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("This is the error", error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
    <div className="Signimage">
    <div className="PassLayout">
      <div className="PassImage">
        <img src={Desktop} alt="" />
      </div>
      <div className="Pass">
      <h1>Reset Password</h1>

      <form onSubmit={handleResetPassword}>
        <input
          type={showpassword ? "text" : "password"} 
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          placeholder="New Password"
        />
        {showpassword ? (
            <i
            className="fa fa-regular fa-eye"
            onClick={handleShowpassword}
          ></i>
        ) : (
          <i
            className="fa-regular fa-eye-slash "
            onClick={handleShowpassword}
          ></i>
        )}
        {/* <button type="button" onClick={handleShowpassword}>
          {showpassword ? "Hide New Password" : "Show New Password"}
        </button> */}
        <input
          type={showconfirm_password ? "text" : "password"} 
          value={confirm_password}
          onChange={(e) => setconfirm_password(e.target.value)}
          required placeholder="Confirm Password"
        />
        {/* <button type="button" onClick={handleShowconfirm_password}>
          {showconfirm_password
            ? "Hide Confirm Password"
            : "Show Confirm Password"}
        </button> */} 
         {showconfirm_password ? (
            <i
            className="fa fa-regular fa-eye"
            onClick={handleShowconfirm_password}
          ></i>
        ) : (
          <i
            className="fa-regular fa-eye-slash "
            onClick={handleShowconfirm_password}
          ></i>
        )}

        <button type="submit" disabled={!isPasswordsMatch}>
          Reset Password
        </button>
      </form>
      <Link to={"/"}>Back to Sign in</Link>
      </div>
      <ToastContainer />
    </div> </div></>
  );
};

export default PassConfirm;
