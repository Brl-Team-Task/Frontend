import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Verify from "../pages/Verify";
import Forgot from "../pages/Forgot";
import PassConfirm from "../pages//PassConfirm";
import SDashboard from "../pages/sdashboard";
import Feedback from "../pages/Feedback";
import ChangePassword from "../pages/changePassword";
import FDashboard from "../pages/fdashboard";
import Branch from "./Branch";
import Utscore from "./Utscore";
import OpenElec from "./OpenElec";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/PassConfirm" element={<PassConfirm />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/sdashboard" element={<SDashboard />} />
        <Route path="/fdashboard" element={<FDashboard />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Branch" element={<Branch />} />
        <Route path="/Utscore" element={<Utscore />} />
        <Route path="/OpenElec" element={<OpenElec/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
