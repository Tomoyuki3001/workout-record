import React, { useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user && user.name;
  const userEmail = user && user.email;
  const userWeight = user && user.weight;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const editProfile = () => {
    if (user._id === "65ed2dffbfa9f74e26318d3f") {
      alert("Demo can't use this function");
      return;
    }
    setEditOpen(true);
  };

  const deleteProfile = () => {
    if (user._id === "65ed2dffbfa9f74e26318d3f") {
      alert("Demo can't use this function");
      return;
    }
    setDeleteOpen(true);
  };

  const updateUserProfile = async () => {
    if (name === "") {
      alert("Please type a name");
      navigate("/profile");
      return;
    }
    if (email === "") {
      alert("Please type an email");
      navigate("/profile");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios
        .post(
          `${url}/api/user/update-user-profile`,
          { name: name, email: email, weight: selectedValue, id: user._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };
  const deleteUserProfile = async () => {
    deleteUserRecord();
    const token = localStorage.getItem("token");
    try {
      const response = await axios
        .post(
          `${url}/api/user/delete-user`,
          { id: user._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };

  const deleteUserRecord = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/api/log/delete-user-record`,
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="pt-10">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4">
          <div className="flex">
            <NavLink to="/">
              <IoIosArrowBack size={30} />
            </NavLink>
          </div>
          <button
            className="px-4 py-2 text-md font-bold bg-fuchsia-500 hover:bg-fuchsia-300 rounded"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mt-4">Profile</h1>
        <div className="flex flex-col items-center my-10">
          <img
            className="md:w-1/5 w-2/6 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 text-gray-400">Name</p>
          <p className="mb-6 text-xl font-bold">{userName}</p>
          <p className="mb-2 text-gray-400">Email</p>
          <p className="mb-6 text-xl font-bold">{userEmail}</p>
          <p className="mb-2 text-gray-400">Display unit</p>
          <p className="mb-6 text-xl font-bold">{userWeight}</p>
          <div className="flex mt-4">
            <button
              className="mr-4 px-4 py-2 text-md font-bold bg-blue-500 mb-4 hover:bg-blue-300 rounded"
              onClick={editProfile}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-md font-bold bg-orange-500 mb-4 hover:bg-orange-300 rounded"
              onClick={() => {
                deleteProfile();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {editOpen && (
        <div className="profile-modal-container w-full flex flex-col items-center">
          <div className="flex flex-col items-center px-20 py-5 bg-gray-400 rounded-xl">
            <div className="w-full mb-4 flex flex-col items-end">
              <button
                onClick={() => {
                  setEditOpen(false);
                }}
              >
                <IoCloseOutline size={30} />
              </button>
            </div>
            <label className="mb-2 font-bold">Name</label>
            <input
              className="mb-4 py-1"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="mb-2 font-bold">Email</label>
            <input
              className="mb-4 py-1"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label className="font-bold">Display unit</label>
            <div className="flex">
              <div className="mr-4">
                <label className="text-xl mr-2">kg</label>
                <input
                  type="radio"
                  id="kg"
                  name="weight"
                  value="kg"
                  onChange={handleRadioChange}
                />
              </div>
              <div>
                <label className="text-xl mr-2">lbs</label>
                <input
                  type="radio"
                  id="lbs"
                  name="weight"
                  value="lbs"
                  onChange={handleRadioChange}
                />
              </div>
            </div>
            <button
              className="mt-10 px-4 py-2 text-md font-bold bg-blue-500 mb-4 hover:bg-blue-300 rounded"
              onClick={() => {
                updateUserProfile();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {deleteOpen && (
        <div className="profile-modal-container w-full flex flex-col items-center p-8">
          <div className="flex flex-col items-center px-20 py-10 bg-gray-400 rounded-xl">
            <div>
              <p className="text-center font-bold">
                Do you want to delete your account?
              </p>
            </div>
            <div className="flex">
              <button
                className="mt-10 mr-4 px-4 py-2 text-md font-bold bg-orange-500 mb-4 hover:bg-orange-300 rounded"
                onClick={() => {
                  deleteUserProfile();
                }}
              >
                Yes
              </button>
              <button
                className="mt-10 px-4 py-2 text-md font-bold bg-blue-500 mb-4 hover:bg-blue-300 rounded"
                onClick={() => {
                  setDeleteOpen(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
};

export default Profile;
