import React, { useState } from "react";
import WeightModal from "./WeightModal";
import TrainingModal from "./TrainingModal";

const TrainingDetails = ({ trainingArray, createTraining }) => {
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setTrainingOpen(true)}>Add Training</button>
      </div>
      {trainingOpen && (
        <TrainingModal
          setTrainingOpen={setTrainingOpen}
          trainingArray={trainingArray}
          createTraining={createTraining}
        />
      )}
      <div>
        <div>
          <div className="flex flex-col">
            {trainingArray.map((training) => (
              <div className="flex justify-around">
                <p>{training.name}</p>
                <button onClick={() => setWeightOpen(true)}>Add reps</button>
              </div>
            ))}
            {weightOpen && <WeightModal setWeightOpen={setWeightOpen} />}
          </div>
          <div className="flex">
            <div className="flex">
              <p>Weight</p>
              <p>1</p>
            </div>
            <div className="flex">
              <p>Rep</p>
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
