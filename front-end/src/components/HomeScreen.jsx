import React, { useState } from "react";
import BottomNavbar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="h-screen pt-4">
      <div className="px-4">
        <div className="flex flex-col justify-center items-center text-center">
          <button
            className="px-4 py-2 bg-blue-400 text-white mb-4"
            onClick={logout}
          >
            Log out
          </button>
          <h2>Hello, Name</h2>
          <p>Weight</p>
          <p>Height</p>
          <p>BMI</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <ul>
            <li>Date, Type, Edit, Delete</li>
            <li>Date, Type, Edit, Delete</li>
            <li>Date, Type, Edit, Delete</li>
            <li>Date, Type, Edit, Delete</li>
            <li>Date, Type, Edit, Delete</li>
            <li>Date, Type, Edit, Delete</li>
          </ul>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default HomeScreen;
