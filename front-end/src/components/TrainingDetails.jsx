import React, { useState } from "react";
import WeightModal from "./WeightModal";
import TrainingModal from "./TrainingModal";

const TrainingDetails = ({ trainingArray, createTraining, setWeightRep }) => {
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [trainingName, setTrainingName] = useState("");

  return (
    <div>
      <div>
        <button
          className="mt-2 px-2 bg-blue-600 hover:bg-blue-300 rounded"
          onClick={() => setTrainingOpen(true)}
        >
          Add Training
        </button>
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
              <>
                <div className="flex justify-around">
                  <p>{training.name}</p>
                  <button
                    onClick={() => {
                      console.log("training array", training);
                      setTrainingName(training.name);
                      setWeightOpen(true);
                    }}
                  >
                    Add reps
                  </button>
                </div>
                {training.set.map((weight) => (
                  <div className="flex justify-around">
                    <div className="flex">
                      <p>Weight:</p>
                      <p>{weight.weight}</p>
                    </div>
                    <div className="flex">
                      <p>Rep:</p>
                      <p>{weight.rep}</p>
                    </div>
                    <button
                      onClick={() => {
                        training.set = training.set.filter(
                          (array) => array !== weight
                        );
                        setWeightRep();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </>
            ))}
            {weightOpen && (
              <WeightModal
                setWeightOpen={setWeightOpen}
                trainingArray={trainingArray}
                trainingName={trainingName}
                setWeightRep={setWeightRep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
