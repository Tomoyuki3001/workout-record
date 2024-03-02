import React, { useState } from "react";
import WeightModal from "./WeightModal";
import TrainingModal from "./TrainingModal";

const TrainingDetails = () => {
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [trainingArray, setTrainingArray] = useState([
    "Cardio",
    "Bench Press",
    "Lat Pulldown",
  ]);

  return (
    <div>
      <div className="flex">
        <button onClick={() => setTrainingOpen(true)}>Add Training</button>
      </div>
      {trainingOpen && <TrainingModal setTrainingOpen={setTrainingOpen} />}
      <div>
        <div>
          <div className="flex flex-col items-center">
            {trainingArray.map((training) => (
              <div className="flex">
                <p>{training}</p>
                <button onClick={() => setWeightOpen(true)}>Add reps</button>
              </div>
            ))}
          </div>
          {weightOpen && <WeightModal setWeightOpen={setWeightOpen} />}
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
