import React, { useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const { user } = useSelector((state) => state.user);
  // const userWeight = user && user.weight;
  const url = "http://localhost:5000";

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/log/get-all-records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data.data[0].logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const month = date
      .toLocaleString("en-US", { month: "long" })
      .padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  function createTrainingList(array) {
    let training = "";
    array.map((value) => (training += value.name + ", "));
    return training;
  }

  return (
    <section>
      <div>
        <div className="w-full pt-10 pb-4 px-4 fixed">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mr-2">Workout Tracking</h1>
            <NavLink to="/profile">
              <FaUserCircle size={50} />
            </NavLink>
          </div>
          <div className="text-center">
            <h2 className="text-lg">Recent activity</h2>
          </div>
        </div>
        <div className="py-36 px-8 flex flex-col items-center text-center md:px-96">
          {logs.map((log) => (
            <NavLink
              to={`/detail/${log.recordId}`}
              state={{ log }}
              className="w-full border text-left p-2 my-2"
            >
              <p className="text-gray-400">Date</p>
              <p className="text mb-2 font-bold">{formatDate(log.date)}</p>
              <p className="text-gray-400">Training</p>
              <p className="font-bold">{createTrainingList(log.set)}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <BottomNavbar user={user} />
    </section>
  );
};

export default Home;
