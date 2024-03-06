import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [logs, setLogs] = useState([]);
  const userName = user && user.name;
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/log/get-all-records",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogs(response.data.data[0].logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <div className="h-screen pt-8">
      <div className="px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Workout Tracking</h1>
          <button
            className="px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
        <div>
          <h2>Hello, {userName}</h2>
        </div>
        <div className="pt-6 pb-24 px-6 flex flex-col items-center text-center overflow-y-scroll h-full">
          {logs.map((log) => (
            <details
              className="flex border my-3 px-4 py-2 bg-gray-700 w-full justify-around"
              key={log.date}
            >
              <summary className="flex justify-around">
                <div className="text-left">
                  <p>Date</p>
                  <p>{log.date}</p>
                </div>
                <div className="text-left">
                  <p>Type</p>
                  <p>{log.type}</p>
                </div>
                <div></div>
              </summary>
              {log.set.map((record) => (
                <>
                  <div className="flex justify-around">
                    <p>{record.name}</p>
                  </div>
                  {record.set.map((weight) => (
                    <div className="flex justify-around">
                      <div className="flex">
                        <p>Weight:</p>
                        <p>{weight.weight}</p>
                      </div>
                      <div className="flex">
                        <p>Rep:</p>
                        <p>{weight.rep}</p>
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </details>
          ))}
        </div>
      </div>
      <BottomNavbar user={user} />
    </div>
  );
};

export default HomeScreen;
