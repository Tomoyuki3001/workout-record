import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log("result", result);
        if (result.data === "Success") {
          navigate("/home");
        }
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
          Log in
        </button>
        <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
