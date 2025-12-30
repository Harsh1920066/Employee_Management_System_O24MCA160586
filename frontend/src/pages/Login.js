import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Axios instance with baseURL
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/login", formData);
      setMessage(res.data.message || "Login successful!");
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to EMS dashboard after 1 second
      setTimeout(() => navigate("/ems"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(135deg, #E3F2FD 0%, #EDE7F6 100%)" }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 border-0"
        style={{ width: "400px", backgroundColor: "#ffffff" }}
      >
        <h3 className="text-center mb-3 fw-bold" style={{ color: "#37474F" }}>
          Welcome Back 👋
        </h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Login to continue managing employees
        </p>

        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("success") ? "alert-success" : "alert-danger"
            } text-center py-2`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", backgroundColor: "#FAFAFA" }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", backgroundColor: "#FAFAFA" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 btn-lg"
            style={{
              backgroundColor: "#5C6BC0",
              color: "white",
              borderRadius: "10px",
              fontWeight: "600",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#3F51B5")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#5C6BC0")}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            Don’t have an account?{" "}
            <span
              className="fw-semibold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
