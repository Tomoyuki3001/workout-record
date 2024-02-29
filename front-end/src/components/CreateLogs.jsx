import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLogs = () => {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "http://localhost:5000/api/log/create-user-log",
        { date, type },
        { headers }
      )
      .then(() => {
        fetchLogs();
      })
      .catch((error) => console.log("Error", error));
  };

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/log/get-all-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data[0]);
      setLogs(response.data.data[0].logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const logEdit = (date) => {
    const logWithSpecificDate = logs.find((log) => log.date === date);
    navigate("/log-edit", { state: { logWithSpecificDate } });
  };

  const logDelete = async (date) => {
    const token = localStorage.getItem("token");
    const updatedLogs = logs.filter((log) => log.date !== date);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/log/delete-log-by-id",
        { newLogs: updatedLogs },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLogs();
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <div>
        <div>
          <h2>Create a daily log</h2>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col items-center text-center justify-center px-4 py-8 bg-gray-400 w-full"
          >
            <div className="flex flex-col items-start mb-5">
              <label>Date</label>
              <input
                className="border"
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col items-start mb-5">
              <label>Categories</label>
              <select
                name="selectedType"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- select a type --{" "}
                </option>
                <option value="upper">Upper Body</option>
                <option value="legs">Leg Workout</option>
                <option value="cardio">Cardio</option>
                <option value="full">Full Body</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-blue-400 text-white mb-4">
              Add
            </button>
          </form>
        </div>
        <div>Add a training log</div>
        <ul className="py-2 px-4 flex flex-col items-center text-center justify-center">
          {logs.map((log) => (
            <li
              className="flex my-2 px-4 py-2 bg-red-300 w-3/4 justify-around"
              key={log.date}
            >
              <div className="text-left">
                <p>Date</p>
                <p>{log.date}</p>
              </div>
              <div className="text-left">
                <p>Type</p>
                <p>{log.type}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    logEdit(log.date);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    logDelete(log.date);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default CreateLogs;
