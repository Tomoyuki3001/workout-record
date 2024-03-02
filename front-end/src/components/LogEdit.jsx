import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LogEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("state", location.state);
  const logDate = location.state.date;
  const [training, setTraining] = useState("");
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);

  // const fetchRecords = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:5000/api/record/get-a-record",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUser(response.data.data[0]);
  //     setLogs(response.data.data[0].logs);
  //   } catch (error) {
  //     console.error("Error fetching logs:", error);
  //   }
  // };

  const backToCreateLog = () => {
    navigate("/logs");
  };

  const createTrainig = async () => {
    const token = localStorage.getItem("token");
    const set = [];
    const id = id;
    const name = training;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/log/create-training-record",
        { id, name, set },
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

  // useEffect(() => {
  //   fetchRecords();
  // }, []);

  return (
    <div>
      <div>Date</div>
      <div>
        <p>Add a training to the record</p>
        <form
          action=""
          // onSubmit={}
          className="flex flex-col items-center text-center justify-center px-4 py-8 bg-gray-400 w-full"
        >
          <div className="flex flex-col items-start mb-5">
            <label>Training</label>
            <input
              className="border"
              type="training"
              placeholder="Training"
              onChange={(e) => {
                setTraining(e.target.value);
              }}
            />
          </div>
          <button className="px-4 py-2 bg-blue-400 text-white mb-4">Add</button>
        </form>
      </div>
      {/* <ul>
        {log.records.map((record) => (
          <li>
            <div className="flex">
              <p>Training name:</p>
              <p>{record.name}</p>
            </div>
            <p>Set</p>
          </li>
        ))}
      </ul> */}
      <div>
        <button onClick={backToCreateLog}>Back</button>
      </div>
    </div>
  );
};

export default LogEdit;
