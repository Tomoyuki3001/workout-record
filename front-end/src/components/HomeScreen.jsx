import React from "react";
import BottomNavbar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user && user.name;
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
          <h2>Hello, {userName}</h2>
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
      <BottomNavbar user={user} />
    </div>
  );
};

export default HomeScreen;
