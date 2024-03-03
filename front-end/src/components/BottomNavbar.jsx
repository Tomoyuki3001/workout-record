import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHome,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  {
    route: "/",
    icon: faHome,
    label: "Home",
  },
  {
    route: "/logs",
    icon: faPlus,
    label: "CreateLogs",
  },
  {
    route: "/profile",
    icon: faUserCircle,
    label: "Profile",
  },
];

const BottomNavbar = ({ user }) => {
  return (
    <nav
      className="px-4 fixed bottom-0 w-full py-4 bg-blue-400"
      role="navigation"
    >
      <Nav className="w-100">
        <div className="w-100 flex justify-between">
          {tabs.map((tab, index) => (
            <NavItem key={`tab-${index}`}>
              <NavLink
                to={{
                  pathname: tab.route,
                }}
                className="nav-link"
                activeClassName="active"
              >
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon size="lg" icon={tab.icon} />
                  <div>{tab.label}</div>
                </div>
              </NavLink>
            </NavItem>
          ))}
        </div>
      </Nav>
    </nav>
  );
};

export default BottomNavbar;
