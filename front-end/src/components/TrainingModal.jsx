import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TrainingModal = ({ setOpen, trainingArray, createTraining }) => {
  const [training, setTrainig] = useState();

  const submitTraining = (e) => {
    e.preventDefault();
    trainingArray.push({ name: training, set: [] });
    createTraining();
    setOpen(false);
  };
  return (
    <div className="training-modal">
      <div className="flex flex-col items-end">
        <button>
          <FontAwesomeIcon
            onClick={() => {
              setOpen(false);
            }}
            icon={faXmark}
          />
        </button>
      </div>
      <form
        action=""
        onSubmit={submitTraining}
        className="flex flex-col items-center"
      >
        <input
          className="w-2/3 text-black"
          type="text"
          onChange={(e) => {
            setTrainig(e.target.value);
          }}
        />
        <button
          className=" w-1/4 mt-4 px-2 bg-blue-600 hover:bg-blue-300 rounded"
          onClick={() => {}}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default TrainingModal;
