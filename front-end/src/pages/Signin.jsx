import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/signup", { name, email, password })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log("Error", error));
  };
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen px-10">
      <form
        action=""
        className="flex flex-col items-center text-center justify-center px-4 py-8 bg-gray-400 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start mb-5">
          <label>Name</label>
          <input
            className="border"
            type="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-5">
          <label>Email</label>
          <input
            className="border"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-5">
          <label>Password</label>
          <input
            className="border"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-blue-400 text-white mb-4">
          Sign up
        </button>
        <Link to="/login">Log in</Link>
      </form>
    </div>
  );
};

export default Signin;
