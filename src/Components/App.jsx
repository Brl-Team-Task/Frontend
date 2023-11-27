import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Verify from "../pages/Verify";
import Forgot from "../pages/Forgot";
import PassConfirm from "../pages//PassConfirm";
import Attendance from "../pages/attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/PassConfirm" element={<PassConfirm />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
