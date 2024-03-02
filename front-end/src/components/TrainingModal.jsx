import React from "react";

const TrainingModal = ({ setTrainingOpen }) => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Name" />
      </div>
      <button onClick={() => setTrainingOpen(false)}>Save</button>
    </div>
  );
};

export default TrainingModal;
