import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import axios from "axios";
import TrainingDetails from "./TrainingDetails";

const CreateLogs = () => {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [trainingArray, setTrainingArray] = useState([
    { name: "Cardio", set: [] },
    { name: "Bench Press", set: [] },
    { name: "Lat Pulldown", set: [] },
  ]);

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

  // const fetchRecord = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:5000/api/record/get-record-by-date",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("record array", response.data.data[0]);
  //   } catch (error) {
  //     console.error("Error fetching logs:", error);
  //   }
  // };

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
        "http://localhost:5000/api/log/create-user-log",
        { date, type, id },
        { headers }
      )
      .then(() => {
        fetchLogs();
      })
      .catch((error) => console.log("Error", error));
  };

  const createTraining = (date, userId) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "http://localhost:5000/api/record/get-record-by-date",
        {
          date,
          userId,
        },
        { headers }
      )
      .then((message) => {
        console.log("message", message);
      })
      .catch((error) => console.log("Error", error));
  };

  // const logEdit = (id, date) => {
  //   console.log(id, date);
  // };

  const logDelete = async (id) => {
    const token = localStorage.getItem("token");
    const updatedLogs = logs.filter((log) => log.id !== id);
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
      <div className="h-screen">
        <form
          action=""
          onSubmit={createDaiyLog}
          className="flex flex-col items-center text-center justify-center px-4 py-2 bg-gray-400 w-full h-1/5"
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
          <button className="px-4 py-2 bg-blue-400 text-white mb-4">Add</button>
        </form>
        <div className="h-4/5 bg-green-200">
          <div className="pt-6 pb-24 px-4 flex flex-col items-center text-center overflow-y-scroll bg-blue-100 h-full">
            {logs.map((log) => (
              <details
                className="flex my-2 px-4 py-2 bg-red-300 w-3/4 justify-around"
                key={log.date}
                onClick={() => {
                  createTraining(log.date, log.userId);
                }}
              >
                <summary className="flex">
                  <div className="text-left">
                    <p>Date</p>
                    <p>{log.date}</p>
                  </div>
                  <div className="text-left">
                    <p>Type</p>
                    <p>{log.type}</p>
                  </div>
                  <div>
                    {/* <button
                      onClick={() => {
                        logEdit(log.id, log.date);
                      }}
                    >
                      Add
                    </button> */}
                    <button
                      onClick={() => {
                        logDelete(log.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </summary>
                <TrainingDetails trainingArray={trainingArray} user={user} />
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
