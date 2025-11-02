import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { fullName, email, phone, studentId, password, confirmPassword } = formData;

    // Email validation
    if (!email.endsWith("@aastu.edu.et")) {
      setError("Only AASTU email addresses are allowed.");
      return;
    }

    // Phone validation (digits only, 9–15 characters)
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Enter a valid phone number (digits only, 9–15 characters).");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save student in localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(formData);
    localStorage.setItem("students", JSON.stringify(students));

    // Show success and redirect to login
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Student Registration
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-2 mb-3 rounded-md text-sm">
            {success}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            AASTU Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="example@aastu.edu.et"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="09XXXXXXXX"
          />
        </div>

        {/* Student ID */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Already have an account */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
