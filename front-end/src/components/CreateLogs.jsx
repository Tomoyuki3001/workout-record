import React from "react";
import BottomNavbar from "./BottomNavbar";

const CreateLogs = () => {
  return (
    <div>
      <div>
        <div>
          <h2>Create a daily log</h2>
          <form
            action=""
            className="flex flex-col items-center text-center justify-center px-4 py-8 bg-gray-400 w-full"
          >
            <div className="flex flex-col items-start mb-5">
              <label>Date</label>
              <input
                className="border"
                type="date"
                placeholder="Date"
                onChange={(e) => {}}
              />
            </div>
            <div className="flex flex-col items-start mb-5">
              <label>Categories</label>
              <select name="selectedFruit">
                <option value="apple">Upper Body</option>
                <option value="banana">Leg Workout</option>
                <option value="orange">Cardio</option>
                <option value="orange">Full Body</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-blue-400 text-white mb-4">
              Add
            </button>
          </form>
        </div>
        <div>Add a training log</div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default CreateLogs;
