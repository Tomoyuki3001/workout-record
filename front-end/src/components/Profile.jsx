import React, { useState } from "react";
import BottomNavbar from "./BottomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

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
            <NavLink to="/" className="mx-2">
              <FaArrowLeftLong size={30} />
            </NavLink>
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <button
            className="px-4 py-2 text-md font-bold bg-blue-600 hover:bg-blue-300 rounded"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
        <div className="flex flex-col items-center mt-20 mb-10">
          <img
            className="md:w-1/5 w-2/6 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 text-xl font-bold">Name</p>
          <p className="mb-6 text-base">{userName}</p>
          <p className="mb-2 text-xl font-bold">Email</p>
          <p className="mb-6 text-base">{userEmail}</p>
          <p className="mb-2 text-xl font-bold">Display unit</p>
          <p className="mb-6 text-base">{userWeight}</p>
          <div className="flex mt-4">
            <button
              className="mr-4 px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
              onClick={editProfile}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-md font-bold bg-orange-600 mb-4 hover:bg-orange-300 rounded"
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
          <div className="flex flex-col items-center px-20 py-10 bg-gray-600 rounded-xl">
            <div className="w-full mb-4 flex flex-col items-end">
              <button>
                <FontAwesomeIcon
                  onClick={() => {
                    setEditOpen(false);
                  }}
                  icon={faXmark}
                />
              </button>
            </div>
            <label className="mb-2 font-bold">Name</label>
            <input
              className="text-black mb-4"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="mb-2 font-bold">Email</label>
            <input
              className="text-black mb-4"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label className="font-bold">Weight</label>
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
              className="mt-10 px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
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
          <div className="flex flex-col items-center px-20 py-10 bg-gray-600 rounded-xl">
            <div>
              <p>Do you want to delete your account?</p>
            </div>
            <div className="flex">
              <button
                className="mt-10 mr-4 px-4 py-2 text-md font-bold bg-orange-600 mb-4 hover:bg-orange-300 rounded"
                onClick={() => {
                  deleteUserProfile();
                }}
              >
                Yes
              </button>
              <button
                className="mt-10 px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
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
