import React from "react";
import { useLocation } from "react-router-dom";

const StudentDashboard = () => {
  const location = useLocation();
  const { studentName } = location.state || { studentName: "Student" };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          Hello {studentName}, welcome to your dashboard.
        </h2>
        <p>This is your student dashboard placeholder.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
