import React, { useEffect, useState } from "react";
import moment from "moment";

// assets
import { BsClock } from "react-icons/bs";

export default function TopNav(props) {
  // live clock function
  const [timeNow, setTimeNow] = useState("");
  useEffect(() => {
    let myTime = setInterval(() => {
      setTimeNow(moment().format("MMM Do YYYY, h:mm:ss a"));
    }, 100);
    return () => clearInterval(myTime);
  });

  const handlePress = () => {
    props.setActive(null);
  };
  return (
    <div className="flex justify-between align-center w-full">
      {/* get this from param */}
      <div>
        <p className="text-2xl font-bold text-primary">Dashboard</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-[240px] flex items-center justify-center bg-input_field text-sm px-3 py-2 rounded-lg text-input_placeholder mr-6">
          <span className="text-xl mr-2">
            <BsClock />
          </span>
          <span>{timeNow}</span>
        </div>
        <div onClick={handlePress}>
          {/* get from redux */}
          <p className="text-sm font-bold text-primary cursor-pointer">
            {props.email}
          </p>
        </div>
      </div>
    </div>
  );
}
