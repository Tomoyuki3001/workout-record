import React from "react";

const WeightModal = ({ setWeightOpen }) => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Weight" />
        <input type="text" placeholder="Rep" />
      </div>
      <button onClick={() => setWeightOpen(false)}>Save</button>
    </div>
  );
};

export default WeightModal;
