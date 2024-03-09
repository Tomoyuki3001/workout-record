import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("kg");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Please type your name");
      return;
    }
    if (email === "") {
      alert("Please type your email");
      return;
    }
    if (password === "") {
      alert("Please type your password");
      return;
    }
    if (password.length < 4) {
      alert("Password should be more than 4 characters");
      return;
    }
    axios
      .post("http://localhost:5000/api/user/signup", {
        name,
        email,
        password,
        weight,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log("Error", error));
  };
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen px-10">
      <form
        action=""
        className="flex flex-col items-center text-center justify-center px-4 py-8 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start mb-8 w-full">
          <label className="text-xl mb-3">Name</label>
          <input
            className="input-log-signup"
            type="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-8 w-full">
          <label className="text-xl mb-3">Email</label>
          <input
            className="input-log-signup"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-8 w-full">
          <label className="text-xl mb-3">Password</label>
          <input
            className="input-log-signup"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 text-xl font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded">
          Sign up
        </button>
        <Link className="border-b text-xl" to="/login">
          Log in
        </Link>
      </form>
    </div>
  );
};

export default Signin;
