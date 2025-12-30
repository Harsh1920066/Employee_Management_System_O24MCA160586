import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/signup", formData);
      setMessage(res.data.message || "Signup successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Admin",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
                console.log("error"+err);
      setMessage(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(135deg, #E3F2FD, #F3E5F5)" }}
    >
      <div className="card shadow p-4 rounded-4 border-0" style={{ width: "400px", backgroundColor: "#ffffff" }}>
        <h3 className="text-center mb-3 fw-bold" style={{ color: "#4A4A4A" }}>Admin Sign Up</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Create an admin account to manage employees
        </p>

        {message && (
          <div className={`alert ${message.toLowerCase().includes("success") ? "alert-success" : "alert-danger"} text-center py-2`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-select form-select-lg"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ borderRadius: "10px" }}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 btn-lg"
            style={{ backgroundColor: "#1976D2", color: "white", borderRadius: "10px" }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            Already have an account?{" "}
            <span
              className="fw-semibold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
