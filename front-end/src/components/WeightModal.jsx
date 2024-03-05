import React, { useState } from "react";

const WeightModal = ({
  setWeightOpen,
  trainingArray,
  trainingName,
  setWeightRep,
}) => {
  const [weight, setWeight] = useState("");
  const [rep, setRep] = useState("");
  // console.log("training name", trainingName);
  const submitWeight = (e) => {
    e.preventDefault();
    let arrayWithName = trainingArray.find((obj) => obj.name === trainingName);
    arrayWithName.set.push({ weight: weight, rep: rep });
    console.log("array of the name", arrayWithName);
    console.log("training array", trainingArray);
    setWeightRep();
    setWeightOpen(false);
  };
  return (
    <div>
      <form action="" onSubmit={submitWeight} className="flex flex-col">
        <input
          type="text"
          placeholder="Weight"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Rep"
          onChange={(e) => {
            setRep(e.target.value);
          }}
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default WeightModal;
