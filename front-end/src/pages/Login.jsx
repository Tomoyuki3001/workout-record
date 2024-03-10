import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please type your email");
      return;
    }
    if (password === "") {
      alert("Please type your password");
      return;
    }
    try {
      const response = await axios.post(
        "https://workout-record-server.vercel.app/api/user/login",
        { email, password }
      );
      if (response.data.success) {
        dispatch(setUser());
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something is wrong");
      console.log("error", error);
    }
  };
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen px-10">
      <form
        action=""
        className="flex flex-col items-center text-center justify-center py-8 px-6 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start mb-8 w-full">
          <label className="text-xl mb-3 font-bold">Email</label>
          <input
            className="input-log-signup"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-8 w-full">
          <label className="text-xl mb-3 font-bold">Password</label>
          <input
            className="input-log-signup"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 text-xl font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded">
          Log in
        </button>
        <Link className="border-b text-xl" to="/signup">
          Sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;
