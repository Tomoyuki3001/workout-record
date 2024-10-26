import React, { useState } from "react";
import WeightModal from "./WeightModal";
import TrainingModal from "./TrainingModal";
import CardioModal from "./CardioModal";
import DistanceModal from "./DistanceModal";

const TrainingDetails = ({
  trainingArray,
  createTraining,
  setWeightRep,
  updateTraining,
  trainingRecordId,
  userWeight,
}) => {
  const [open, setOpen] = useState(false);
  const [cardioOpen, setCardioOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [trainingName, setTrainingName] = useState("");

  return (
    <div>
      <div>
        <button
          className="my-4 px-2 bg-blue-600 hover:bg-blue-300 rounded"
          onClick={() => setOpen(true)}
        >
          Add Training
        </button>
        <button
          className=" ml-4 my-4 px-2 bg-green-600 hover:bg-green-300 rounded"
          onClick={() => setCardioOpen(true)}
        >
          Add Cardio
        </button>
      </div>
      <div className="flex flex-col items-center">
        {open && (
          <TrainingModal
            setOpen={setOpen}
            trainingArray={trainingArray}
            createTraining={createTraining}
          />
        )}
        {cardioOpen && (
          <CardioModal
            setCardioOpen={setCardioOpen}
            trainingArray={trainingArray}
            createTraining={createTraining}
          />
        )}
        {weightOpen && (
          <WeightModal
            setWeightOpen={setWeightOpen}
            trainingArray={trainingArray}
            trainingName={trainingName}
            setWeightRep={setWeightRep}
          />
        )}
        {distanceOpen && (
          <DistanceModal
            setDistanceOpen={setDistanceOpen}
            trainingArray={trainingArray}
            trainingName={trainingName}
            setWeightRep={setWeightRep}
          />
        )}
      </div>
      <div>
        <div>
          <div className="flex flex-col">
            {trainingArray.map((training) => (
              <div className="px-2 mb-4 w-full">
                <div className="text-start">
                  <p className="font-bold text-xl">・{training.name}</p>
                </div>
                <div className="flex flex-col items-end mb-2">
                  {!training.cardio ? (
                    <div>
                      <button
                        className="px-2 mr-2 bg-blue-500 hover:bg-blue-700 rounded weight-button"
                        onClick={() => {
                          setTrainingName(training.name);
                          setWeightOpen(true);
                        }}
                      >
                        Add Reps
                      </button>
                      <button
                        className="px-2 bg-gray-500 hover:bg-gray-700 rounded"
                        onClick={() => {
                          trainingArray = trainingArray.filter(
                            (array) => array !== training
                          );
                          updateTraining(trainingArray, trainingRecordId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="px-2 mr-2 bg-blue-500 hover:bg-blue-700 rounded weight-button"
                        onClick={() => {
                          setTrainingName(training.name);
                          setDistanceOpen(true);
                        }}
                      >
                        Add Time
                      </button>
                      <button
                        className="px-2 bg-gray-500 hover:bg-gray-700 rounded"
                        onClick={() => {
                          trainingArray = trainingArray.filter(
                            (array) => array !== training
                          );
                          updateTraining(trainingArray, trainingRecordId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <table className="w-full mb-4">
                  <tr className="border-b-2">
                    <th className="font-thin">
                      {!training.cardio ? "Weight" : "Time"}
                    </th>
                    <th className="font-thin">
                      {!training.cardio ? "Reps" : "Distance"}
                    </th>
                    <th></th>
                  </tr>
                  {training.set.map((weight) => (
                    <tr>
                      <td>
                        {!training.cardio
                          ? weight.weight + " " + userWeight
                          : weight.time + " mins"}
                      </td>
                      <td>
                        {!training.cardio
                          ? weight.rep
                          : weight.distance + " km"}
                      </td>
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
          </div>
          <button className="mt-2 px-2 bg-orange-500 hover:bg-orange-300 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
