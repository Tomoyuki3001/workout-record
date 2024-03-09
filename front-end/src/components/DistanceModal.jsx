import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DistanceModal = ({
  setDistanceOpen,
  trainingArray,
  trainingName,
  setWeightRep,
}) => {
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const submitWeight = (e) => {
    e.preventDefault();
    let arrayWithName = trainingArray.find((obj) => obj.name === trainingName);
    arrayWithName.set.push({ time: time, distance: distance });
    setWeightRep();
    setDistanceOpen(false);
  };
  return (
    <div className="weight-modal">
      <div className="flex flex-col items-end">
        <button>
          <FontAwesomeIcon
            onClick={() => {
              setDistanceOpen(false);
            }}
            icon={faXmark}
          />
        </button>
      </div>
      <form
        action=""
        onSubmit={submitWeight}
        className="flex flex-col items-center"
      >
        <input
          className="w-2/3 mb-4 text-black"
          type="text"
          placeholder="Time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <input
          className="w-2/3 text-black"
          type="text"
          placeholder="Distance"
          onChange={(e) => {
            setDistance(e.target.value);
          }}
        />
        <button className=" w-1/4 mt-4 px-2 bg-blue-600 hover:bg-blue-300 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default DistanceModal;
