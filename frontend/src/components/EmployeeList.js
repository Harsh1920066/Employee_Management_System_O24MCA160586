// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);  // Refresh list when 'refresh' prop changes

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Optional: Edit form can be shown inline */}
      {selectedEmployee && (
        <EmployeeForm selectedEmployee={selectedEmployee} onSuccess={fetchEmployees} />
      )}

      <h3 className="mt-4">Employee List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedEmployee(emp)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
