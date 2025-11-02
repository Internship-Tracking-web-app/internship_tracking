import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Admin login
    if (
      emailOrUsername === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      navigate("/admin-dashboard");
      return;
    }

    // Student login
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(
      (s) => s.email === emailOrUsername && s.password === password
    );

    if (student && student.email.endsWith("@aastu.edu.et")) {
      navigate("/student-dashboard", { state: { studentName: student.fullName } });
      return;
    }

    // Other users login
    const otherUsers = JSON.parse(localStorage.getItem("otherUsers")) || [];
    const otherUser = otherUsers.find(
      (u) => u.username === emailOrUsername && u.password === password
    );

    if (otherUser) {
      if (otherUser.role === "Company") navigate("/company-dashboard");
      else if (otherUser.role === "Supervisor") navigate("/supervisor-dashboard");
      else if (otherUser.role === "Advisor") navigate("/advisor-dashboard");
      return;
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
