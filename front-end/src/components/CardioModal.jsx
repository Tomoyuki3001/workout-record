import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CardioModal = ({ setCardioOpen, trainingArray, createTraining }) => {
  const [training, setTrainig] = useState("");

  const submitTraining = (e) => {
    e.preventDefault();
    if (training === "") {
      alert("Please enter the training");
      return;
    }
    trainingArray.push({ name: training, cardio: true, set: [] });
    createTraining();
    setCardioOpen(false);
  };
  return (
    <div className="modal-component">
      <div className="flex flex-col items-end">
        <button>
          <FontAwesomeIcon
            onClick={() => {
              setCardioOpen(false);
            }}
            icon={faXmark}
            className="text-white"
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
          className="mt-4 px-2 bg-blue-500 hover:bg-blue-300 rounded"
          onClick={() => {}}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CardioModal;
