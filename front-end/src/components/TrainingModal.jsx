import React, { useState } from "react";

const TrainingModal = ({ setTrainingOpen, trainingArray }) => {
  const [training, setTrainig] = useState();

  const submitTraining = (e) => {
    e.preventDefault();
    trainingArray.push({ name: training, set: [] });
    setTrainingOpen(false);
  };
  return (
    <div>
      <form action="" onSubmit={submitTraining} className="flex flex-col">
        <input
          type="text"
          onChange={(e) => {
            setTrainig(e.target.value);
          }}
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default TrainingModal;
