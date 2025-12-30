// src/components/EmployeeForm.js
import React, { useState, useEffect } from "react";
import api from "../api/axios";

const EmployeeForm = ({ selectedEmployee, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // Predefined departments
  const departments = ["HR", "Finance", "IT", "Sales", "Marketing", "Operations"];

  // Fill form when editing
  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setDepartment(selectedEmployee.department);
      setSalary(selectedEmployee.salary);
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        console.log("Selected Employee: "+selectedEmployee);
        
        await api.put(`/employees/${selectedEmployee.id}`, { name, email, department, salary });
      } else {
        await api.post("/employees", { name, email, department, salary });
      }
      onSuccess(); // Refresh list in parent
      setName(""); setEmail(""); setDepartment(""); setSalary("");
    } catch (err) {
      console.error(err);
      alert("Error saving employee");
    }
  };

  return (
    <div className="card mt-4 p-3">
      <h4>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mt-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="form-control mt-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {/* Department as dropdown */}
        <select
          className="form-control mt-2"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
        <input
          className="form-control mt-2"
          placeholder="Salary"
          type="number"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          required
        />
        <button className="btn btn-success mt-2" type="submit">
          {selectedEmployee ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
