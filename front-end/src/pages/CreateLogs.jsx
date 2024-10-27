import React, { useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import axios from "axios";
import TrainingDetails from "../components/TrainingDetails";
import { useSelector } from "react-redux";

const CreateLogs = () => {
  const { user } = useSelector((state) => state.user);
  const userWeight = user && user.weight;
  const [date, setDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [trainingArray, setTrainingArray] = useState([]);
  const [trainingRecordId, setTrainigRecordId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState("");
  // const url = "http://localhost:5000";
  const url = "https://workout-server-murex.vercel.app";

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
      .post(`${url}/api/log/create-daily-log`, { date, id }, { headers })
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
        `${url}/api/log/update-training-by-date`,
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
        `${url}/api/log/update-training-by-user`,
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
        `${url}/api/log/update-weight-by-training`,
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
        `${url}/api/log/delete-log-by-id`,
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

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const month = date
      .toLocaleString("en-US", { month: "long" })
      .padStart(2, "0");
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <section>
      <div>
        <form
          action=""
          onSubmit={createDaiyLog}
          className="flex flex-col items-center text-center justify-center px-4 pt-10"
        >
          <div className="flex">
            <div className="flex items-center">
              <label className="font-bold">Date:</label>
              <input
                className="mx-3 border bg-transparent w-11/12 h-6"
                type="date"
                placeholder="mm/dd/yyyy"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
              <button className="px-4 py-2 font-bold bg-blue-500 hover:bg-blue-300 rounded">
                Add
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-lg my-2 text-gray-500">
              Add or delete a record
            </h2>
          </div>
        </form>
        <div class="pb-32 px-4 flex flex-col items-center text-center md:px-96">
          {logs.map((log) => (
            <details
              className="flex my-3 px-2 py-4 justify-around border w-full"
              key={log.date}
              onClick={() => {
                setTrainigRecordId(log.recordId);
                setTrainingArray(log.set);
              }}
            >
              <summary className="flex justify-around">
                <div className="text-left">
                  <p className="font-bold">{formatDate(log.date)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    className="px-2 bg-orange-400 hover:bg-orange-300 rounded"
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
                    <div className="flex flex-col items-center px-20 py-10 bg-gray-500 rounded-xl">
                      <div>
                        <p className="font-bold">
                          Do you want to delete this record?
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          className="mt-10 mr-4 px-4 py-2 text-md font-bold bg-orange-500 mb-4 hover:bg-orange-300 rounded"
                          onClick={() => {
                            logDelete(deleteRecordId);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className="mt-10 px-4 py-2 text-md font-bold bg-blue-500 mb-4 hover:bg-blue-300 rounded"
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
          <BottomNavbar />
        </div>
      </div>
    </section>
  );
};

export default CreateLogs;
