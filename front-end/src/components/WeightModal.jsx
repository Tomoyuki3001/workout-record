import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const WeightModal = ({
  setWeightOpen,
  trainingArray,
  trainingName,
  setWeightRep,
}) => {
  const [weight, setWeight] = useState("");
  const [rep, setRep] = useState("");
  const submitWeight = (e) => {
    e.preventDefault();
    if (weight === "") {
      alert("Please enter the weight");
      return;
    }
    if (rep === "") {
      alert("Please enter the reps");
      return;
    }
    let arrayWithName = trainingArray.find((obj) => obj.name === trainingName);
    arrayWithName.set.push({ weight: weight, rep: rep });
    setWeightRep();
    setWeightOpen(false);
  };
  return (
    <div className="weight-modal">
      <div className="flex flex-col items-end">
        <button>
          <FontAwesomeIcon
            onClick={() => {
              setWeightOpen(false);
            }}
            icon={faXmark}
          />
        </button>
      </div>
      <form
        action=""
        onSubmit={submitWeight}
        className="flex flex-col items-center"
      >
        <input
          className="w-2/3 mb-4 text-black"
          type="text"
          placeholder="Weight"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        <input
          className="w-2/3 text-black"
          type="text"
          placeholder="Rep"
          onChange={(e) => {
            setRep(e.target.value);
          }}
        />
        <button className=" w-1/4 mt-4 px-2 bg-blue-600 hover:bg-blue-300 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default WeightModal;
