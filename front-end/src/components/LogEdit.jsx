import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LogEdit = () => {
  const location = useLocation();
  const log = location.state.logWithSpecificDate;
  console.log("log", log);
  const navigate = useNavigate();

  const backToCreateLog = () => {
    navigate("/logs");
  };
  return (
    <div>
      <div>{log.date}</div>
      <div>
        <button onClick={backToCreateLog}>Back</button>
      </div>
    </div>
  );
};

export default LogEdit;
