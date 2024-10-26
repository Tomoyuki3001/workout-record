import React from "react";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";

const BottomNavbar = () => {
  const tabs = [
    {
      route: "/",
      label: "Home",
      icon: <AiOutlineHome size={40} />,
    },
    {
      route: "/logs",
      label: "Edit",
      icon: <FaPlus size={40} />,
    },
  ];

  return (
    <Nav className="w-full px-10 fixed bottom-0 pb-7 pt-2 bg-gray-600 md:px-48">
      <div className="w-full flex justify-around">
        {tabs.map((tab) => (
          <NavLink
            to={{
              pathname: tab.route,
            }}
            className="nav-link text-white"
          >
            <div className="flex flex-col items-center">
              {tab.icon} {tab.label}
            </div>
          </NavLink>
        ))}
      </div>
    </Nav>
  );
};

export default BottomNavbar;
