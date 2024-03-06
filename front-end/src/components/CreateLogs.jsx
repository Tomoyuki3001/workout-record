import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import axios from "axios";
import TrainingDetails from "./TrainingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, fafaAngleUp } from "@fortawesome/free-solid-svg-icons";

const CreateLogs = () => {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [trainingArray, setTrainingArray] = useState([]);
  const [angle, setAngle] = useState(faAngleDown);

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
      setUser(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const createDaiyLog = (e) => {
    e.preventDefault();
    let randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    let id = randomNumber.toString().substring(0, 10);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "http://localhost:5000/api/log/create-daily-log",
        { date, type, id },
        { headers }
      )
      .then(() => {
        fetchLogs();
        window.location.reload();
      })
      .catch((error) => console.log("Error", error));
  };

  const createTraining = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/log/update-training-by-date",
        { newArray: logs },
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

  const setWeightRep = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/log/update-weight-by-training",
        { newArray: logs },
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

  const logDelete = async (id) => {
    const token = localStorage.getItem("token");
    const updatedLogs = logs.filter((log) => log.recordId !== id);
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
      <div className="h-4/5">
        <form
          action=""
          onSubmit={createDaiyLog}
          className="flex flex-col items-center text-center justify-center fixed border-b-2 px-4 py-2 w-full h-1/5"
        >
          <div className="flex">
            <div className="flex flex-col items-start mb-5">
              <label className="mb-2">Date</label>
              <input
                className="border bg-transparent w-11/12 h-6"
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col items-start mb-5">
              <label className="mb-2">Categories</label>
              <select
                className="border bg-transparent"
                name="selectedType"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- Select a type --{" "}
                </option>
                <option className="bg-[#1f2937]" value="Upper Body">
                  Upper Body
                </option>
                <option className="bg-[#1f2937]" value="Leg workout">
                  Leg Workout
                </option>
                <option className="bg-[#1f2937]" value="Cardio">
                  Cardio
                </option>
                <option className="bg-[#1f2937]" value="Full Body">
                  Full Body
                </option>
              </select>
            </div>
          </div>
          <button className="px-4 py-2 font-bold bg-blue-600 hover:bg-blue-300 rounded">
            Add
          </button>
        </form>
        <div className="h-4/5">
          <div className="pt-48 pb-24 px-8 flex flex-col items-center text-center h-full">
            {logs.map((log) => (
              <details
                className="flex my-3 px-2 py-3 w-full justify-around border bg-gray-700"
                key={log.date}
                onClick={() => {
                  setTrainingArray(log.set);
                }}
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
                  <div className="flex flex-col items-end">
                    <FontAwesomeIcon icon={angle} />
                    <button
                      className="mt-2 px-2 bg-blue-600 hover:bg-blue-300 rounded"
                      onClick={() => {
                        logDelete(log.recordId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </summary>
                <TrainingDetails
                  trainingArray={trainingArray}
                  createTraining={createTraining}
                  setWeightRep={setWeightRep}
                />
              </details>
            ))}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default CreateLogs;
