import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen px-10">
      <form
        action=""
        className="flex flex-col items-center text-center justify-center px-4 py-8 bg-gray-400 w-full"
      >
        <div className="flex flex-col items-start mb-5">
          <label>Name</label>
          <input className="border" type="text" placeholder="Name" />
        </div>
        <div className="flex flex-col items-start mb-5">
          <label>Password</label>
          <input className="border" type="text" placeholder="Password" />
        </div>
        <button className="px-4 py-2 bg-blue-400 text-white mb-4">
          Log in
        </button>
        <a href="#">Sign up</a>
      </form>
    </div>
  );
};

export default Login;
