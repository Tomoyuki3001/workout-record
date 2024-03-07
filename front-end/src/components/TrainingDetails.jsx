import React, { useState } from "react";
import WeightModal from "./WeightModal";
import TrainingModal from "./TrainingModal";

const TrainingDetails = ({
  trainingArray,
  createTraining,
  setWeightRep,
  updateTraining,
}) => {
  const [open, setOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [trainingName, setTrainingName] = useState("");

  return (
    <div>
      <div>
        <button
          className="my-2 px-2 bg-blue-600 hover:bg-blue-300 rounded"
          onClick={() => setOpen(true)}
        >
          Add Training
        </button>
      </div>
      <div className="flex flex-col items-center">
        {open && (
          <TrainingModal
            open={open}
            setOpen={setOpen}
            trainingArray={trainingArray}
            createTraining={createTraining}
          />
        )}
      </div>
      <div>
        <div>
          <div className="flex flex-col">
            {trainingArray.map((training) => (
              <div className="mb-2 w-full">
                <div className="flex justify-between mb-2">
                  <p className="font-bold text-xl">・{training.name}</p>
                  <div>
                    <button
                      className="px-2 mr-2 bg-blue-400 hover:bg-blue-600 rounded"
                      onClick={() => {
                        console.log("training array", training);
                        setTrainingName(training.name);
                        setWeightOpen(true);
                      }}
                    >
                      Add Reps
                    </button>
                    <button
                      className="px-2 bg-orange-400 hover:bg-orange-600 rounded"
                      onClick={() => {
                        trainingArray = trainingArray.filter(
                          (array) => array !== training
                        );
                        updateTraining();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <table className="w-full">
                  <tr className="border-b-2">
                    <th className="font-thin">Weight</th>
                    <th className="font-thin">Reps</th>
                    <th></th>
                  </tr>
                  {training.set.map((weight) => (
                    <tr>
                      <td>{weight.weight}</td>
                      <td>{weight.rep}</td>
                      <td>
                        <button
                          className="px-2 bg-gray-500 hover:bg-gray-700 rounded"
                          onClick={() => {
                            training.set = training.set.filter(
                              (array) => array !== weight
                            );
                            setWeightRep();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
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
