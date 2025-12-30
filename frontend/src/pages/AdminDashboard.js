// src/pages/AdminDashboard.js
import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);   // Controls form visibility
  const [refresh, setRefresh] = useState(false);     // Trigger EmployeeList refresh
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleSuccess = () => {
    setShowForm(false);           // Hide form after adding/updating employee
    setRefresh(!refresh);         // Refresh employee list
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* Add New Employee Button */}
      {!showForm && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          Add New Employee
        </button>
      )}

      {/* Employee Form Popup */}
      {showForm && (
        <div className="card p-3 mb-3">
          <EmployeeForm selectedEmployee={null} onSuccess={handleSuccess} />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Employee List */}
      <EmployeeList refresh={refresh} />
    </div>
  );
};

export default AdminDashboard;
