import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Interview from "../pages/Interview";
import Results from "../pages/Results";
import History from "../pages/History";
import CompanyCoding from "../pages/CompanyCoding";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route
  path="/company-coding"
  element={<CompanyCoding />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;