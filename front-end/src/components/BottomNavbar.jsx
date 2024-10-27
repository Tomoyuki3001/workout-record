import React from "react";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import { TfiHome } from "react-icons/tfi";
import { GoPlus } from "react-icons/go";

const BottomNavbar = () => {
  const tabs = [
    {
      route: "/",
      label: "Home",
      icon: <TfiHome size={25} />,
    },
    {
      route: "/logs",
      label: "Create",
      icon: <GoPlus size={25} />,
    },
  ];

  return (
    <Nav className="w-full px-10 fixed bottom-0 pb-4 pt-1 bg-slate-100 md:px-48">
      <div className="w-full flex justify-around">
        {tabs.map((tab) => (
          <NavLink
            to={{
              pathname: tab.route,
            }}
            className="nav-link text-slate-500 font-thin"
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
