import React from "react";
import BottomNavbar from "./BottomNavbar";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center">
        <div>User image</div>
        <p>User name</p>
        <p>User email</p>
        <p>Favorite training</p>
        <div className="flex flex-col">
          <button>Edit</button>
          <button>Delete</button>
          <button>Log out</button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Profile;
