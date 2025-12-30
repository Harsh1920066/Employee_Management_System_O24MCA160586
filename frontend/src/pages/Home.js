import React from "react";
import welcomeImage from "../assets/Home.png"; // your uploaded image
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <header className="mb-4">
        <h1 className="text-dark">Welcome to EMS</h1>
        <p className="text-secondary fs-5">Let's get started with Employee Management System</p>
      </header>

      <img 
        src={welcomeImage} 
        alt="EMS Illustration" 
        className="img-fluid mb-4 rounded shadow" 
        style={{ maxWidth: "400px" }} 
      />

      <div className="d-flex justify-content-center gap-3">
               <Link to="/admin" className="btn btn-primary btn-lg">
  Go to Admin
</Link>
<Link to="/employee" className="btn btn-success btn-lg">
  Go to Employee
</Link>
      </div>
    </div>
  );
};

export default Home;
