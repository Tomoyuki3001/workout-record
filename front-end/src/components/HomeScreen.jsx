import React from "react";
import BottomNavbar from "./BottomNavbar";

const HomeScreen = () => {
  return (
    <div className="h-screen pt-4">
      <div className="px-4">
        <div className="flex flex-col justify-center items-center text-center">
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
