import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  const [logs, setLogs] = useState([]);
  const { user } = useSelector((state) => state.user);
  const userName = user && user.name;
  const userWeight = user && user.weight;
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
      <div>
        <div className="fixed bg-[#1f2937] w-full">
          <div className="flex justify-around">
            <h1 className="text-2xl font-bold mr-2">Workout Tracking</h1>
            <button
              className="px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
          <div className="pl-8">
            <h2>Hello, {userName}</h2>
          </div>
        </div>
        <div className="pt-28 pb-24 px-8 flex flex-col items-center text-center">
          {logs.map((log) => (
            <details
              className="flex border my-3 px-1 py-2 bg-gray-700 w-full justify-around"
              key={log.date}
              onClick={() => {}}
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
                <FontAwesomeIcon icon={faAngleDown} />
              </summary>
              {log.set.map((record) => (
                <div className="mt-4 px-2">
                  <div className="text-start mb-2">
                    <p className="font-bold text-xl">・{record.name}</p>
                  </div>
                  <table className="w-full mb-4">
                    <tr className="border-b-2">
                      <th className="font-thin">Weight</th>
                      <th className="font-thin">Reps</th>
                      <th></th>
                    </tr>
                    {record.set.map((weight) => (
                      <tr>
                        <td>
                          {weight.weight} {userWeight}
                        </td>
                        <td>{weight.rep}</td>
                      </tr>
                    ))}
                  </table>
                </div>
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
