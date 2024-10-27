import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const LogDetail = () => {
  const location = useLocation();
  const log = location.state?.log;
  const { user } = useSelector((state) => state.user);
  const userWeight = user && user.weight;

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const month = date
      .toLocaleString("en-US", { month: "long" })
      .padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  return (
    <section className="text-slate-700">
      <NavLink
        to={"/"}
        className="bg-slate-50 px-2 pt-4 pb-2 fixed w-full drop-shadow-xl z-10"
      >
        <IoIosArrowBack size={35} />
      </NavLink>
      <div className="px-4 py-24">
        <p className="text-gray-400">Date</p>
        <p className="text-xl mb-4 font-bold">{formatDate(log.date)}</p>
        <p className="text-gray-400">Training</p>
        {log.set.map((record) => (
          <div className="mt-2">
            <div className="text-start mb-1">
              <p className="font-bold text-xl">{record.name}</p>
            </div>
            <div className="w-full mb-4">
              {record.set.map((weight) => (
                <div>
                  <div className="flex justify-between">
                    <div>{record.set.indexOf(weight) + 1}</div>
                    <div className="flex justify-end text-right w-full">
                      <div className="w-1/4 mb-1">
                        {!record.cardio
                          ? weight.weight + " " + userWeight
                          : weight.time + " mins"}
                      </div>
                      <div className="w-1/4">
                        {!record.cardio
                          ? weight.rep + " reps"
                          : weight.distance + " km"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr class="hr" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogDetail;
