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
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/fdashboard" element={<FDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
