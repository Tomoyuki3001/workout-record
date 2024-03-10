import React, { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import axios from "axios";
import TrainingDetails from "./TrainingDetails";
import { useSelector } from "react-redux";

const CreateLogs = () => {
  const { user } = useSelector((state) => state.user);
  const userWeight = user && user.weight;
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [logs, setLogs] = useState([]);
  const [trainingArray, setTrainingArray] = useState([]);
  const [trainingRecordId, setTrainigRecordId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState("");

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://workout-record-server.vercel.app/api/log/get-all-records",
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

  const createDaiyLog = (e) => {
    e.preventDefault();
    let randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    let id = randomNumber.toString().substring(0, 12);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://workout-record-server.vercel.app/api/log/create-daily-log",
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
        "https://workout-record-server.vercel.app/api/log/update-training-by-date",
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

  const updateTraining = async (array, id) => {
    const token = localStorage.getItem("token");
    let deletedArray = logs.find((log) => log.recordId === id);
    deletedArray.set = array;
    try {
      const response = await axios.post(
        "https://workout-record-server.vercel.app/api/log/update-training-by-user",
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
        "https://workout-record-server.vercel.app/api/log/update-weight-by-training",
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
    let updatedlog = logs.filter((log) => log.recordId !== id);
    try {
      const response = await axios.post(
        "https://workout-record-server.vercel.app/api/log/delete-log-by-id",
        { newLogs: updatedlog },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleteModal(false);
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
          className="flex flex-col items-center text-center justify-center fixed bg-[#1f2937] border-b-4 px-4 py-2 w-full h-1/5"
        >
          <div className="flex">
            <div className="flex flex-col items-start mb-5 mr-2">
              <label className="mb-2 font-bold">Date</label>
              <input
                className="border bg-transparent w-11/12 h-6"
                type="text"
                onfocus={(this.type = "date")}
                placeholder="MM/DD/YYYY"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col items-start mb-5">
              <label className="mb-2 font-bold">Categories</label>
              <select
                className="border bg-transparent"
                name="selectedType"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
              >
                <option disabled selected value="">
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
                  setTrainigRecordId(log.recordId);
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
                    <button
                      className="mt-2 px-2 bg-orange-500 hover:bg-orange-300 rounded"
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteRecordId(log.recordId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {deleteModal && (
                    <div className="profile-modal-container w-full flex flex-col items-center p-8">
                      <div className="flex flex-col items-center px-20 py-10 bg-gray-600 rounded-xl">
                        <div>
                          <p>Do you want to delete this date?</p>
                        </div>
                        <div className="flex">
                          <button
                            className="mt-10 mr-4 px-4 py-2 text-md font-bold bg-orange-600 mb-4 hover:bg-orange-300 rounded"
                            onClick={() => {
                              logDelete(deleteRecordId);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="mt-10 px-4 py-2 text-md font-bold bg-blue-600 mb-4 hover:bg-blue-300 rounded"
                            onClick={() => {
                              setDeleteModal(false);
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </summary>
                <TrainingDetails
                  trainingArray={trainingArray}
                  createTraining={createTraining}
                  setWeightRep={setWeightRep}
                  updateTraining={updateTraining}
                  trainingRecordId={trainingRecordId}
                  userWeight={userWeight}
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
