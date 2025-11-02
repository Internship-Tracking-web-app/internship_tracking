import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import SupervisorDashboard from "./components/SupervisorDashboard";
import AdvisorDashboard from "./components/AdvisorDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="text-[40px] text-center mt-6 font-bold text-blue-700">
        Internship Tracking System
      </div>

      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

