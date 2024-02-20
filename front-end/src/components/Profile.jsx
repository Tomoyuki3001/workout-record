import React from "react";
import BottomNavbar from "./BottomNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const editProfile = () => {
    console.log("edit");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/update-profile",
        {
          ...values,
          userId: user._id,
          timeTo: values.timeTo,
          timeFrom: values.timeFrom,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to the Home page");
        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something wrong", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center">
        <p>User name</p>
        <p>User email</p>
        <p>Favorite training</p>
        <div className="flex flex-col">
          <button onClick={editProfile}>Edit</button>
          <button>Delete</button>
          <button
            className="px-4 py-2 bg-blue-400 text-white mb-4"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Profile;
