import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const identifier = (emailOrUsername || "").trim();
    const normalizedId = identifier.toLowerCase();
    const pwd = password;
    const selectedRole = role;

    // Admin login (accept "admin" or "admin@aastu.edu.et") when role is Admin
    if (
      selectedRole === "Admin" &&
      (normalizedId === adminCredentials.username || normalizedId === "admin@aastu.edu.et") &&
      pwd === adminCredentials.password
    ) {
      navigate("/admin-dashboard");
      return;
    }

    // Student login (by email or studentId) when role is Student
    if (selectedRole === "Student") {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const student = students.find((s) => {
        const email = (s?.email || "").trim().toLowerCase();
        const sid = (s?.studentId || "").trim().toLowerCase();
        const pass = s?.password;
        const idMatches = normalizedId.includes("@")
          ? email === normalizedId
          : email === normalizedId || sid === normalizedId;
        return idMatches && pass === pwd;
      });

      if (student) {
        navigate("/student-dashboard", { state: { studentName: student.fullName } });
        return;
      }
    }

    // Other users login
    // Other roles via otherUsers: Advisor, Supervisor, Company Representative
    const roleMap = {
      "Company Representative": "Company",
      "Company": "Company",
      "Advisor": "Advisor",
      "Supervisor": "Supervisor",
    };
    if (["Advisor", "Supervisor", "Company Representative", "Company"].includes(selectedRole)) {
      const desiredRole = roleMap[selectedRole] || selectedRole;
      const otherUsers = JSON.parse(localStorage.getItem("otherUsers")) || [];
      const otherUser = otherUsers.find((u) => {
        const uname = (u?.username || "").trim().toLowerCase();
        const pass = u?.password;
        const roleOk = (u?.role || "") === desiredRole;
        return uname === normalizedId && pass === pwd && roleOk;
      });

      if (otherUser) {
        if (desiredRole === "Company") navigate("/company-dashboard");
        else if (desiredRole === "Supervisor") navigate("/supervisor-dashboard");
        else if (desiredRole === "Advisor") navigate("/advisor-dashboard");
        return;
      }
    }

    // Invalid credentials
    setError("Invalid username/email or password.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option>Student</option>
            <option>Advisor</option>
            <option>Supervisor</option>
            <option>Company Representative</option>
            <option>Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Email or Username
          </label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="AASTU email or username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Need to register link */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Need to register?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
