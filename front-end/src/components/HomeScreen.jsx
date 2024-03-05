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
    <div className="h-screen pt-4">
      <div className="px-4">
        <div className="flex flex-col justify-center items-center text-center">
          <button
            className="px-4 py-2 bg-blue-400 text-white mb-4"
            onClick={logout}
          >
            Log out
          </button>
          <h2>Hello, {userName}</h2>
        </div>
        <div className="pt-6 pb-24 px-4 flex flex-col items-center text-center overflow-y-scroll bg-blue-100 h-full">
          {logs.map((log) => (
            <details
              className="flex my-2 px-4 py-2 bg-red-300 w-3/4 justify-around"
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
