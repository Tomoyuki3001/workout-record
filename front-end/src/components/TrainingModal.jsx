import React, { useState } from "react";

const TrainingModal = ({ setTrainingOpen, trainingArray, createTraining }) => {
  const [training, setTrainig] = useState();

  const submitTraining = (e) => {
    e.preventDefault();
    trainingArray.push({ name: training, set: [] });
    createTraining();
    setTrainingOpen(false);
  };
  return (
    <div className="training-modal">
      <form
        action=""
        onSubmit={submitTraining}
        className="flex flex-col items-center"
      >
        <input
          className="w-1/2"
          type="text"
          onChange={(e) => {
            setTrainig(e.target.value);
          }}
        />
        <button
          className=" w-1/4 mt-2 px-2 bg-blue-600 hover:bg-blue-300 rounded"
          onClick={() => {
            console.log("save");
          }}
        >
          Save
        </button>
      </form>
      <button
        className=" w-1/4 mt-2 px-2 bg-blue-600 hover:bg-blue-300 rounded"
        onClick={() => {
          setTrainingOpen(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default TrainingModal;
