import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function CurrentData() {
  const [queueData, setQueueData] = useState([]);
  const [timePageLoad, setTimePageLoad] = useState("");

  function getQueueData() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/queue-data`)
      .then(function (res) {
        console.log(res);
        setQueueData(res.data);
        setTimePageLoad(moment(Date.now()).format(" h:mm a"));
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getQueueData();
  }, []);

  return (
    <div className="w-[90%] h-auto py-10 px-2 mx-auto">
      <div className="flex justify-between items-center pb-8">
        <div className="w-1/2">
          <p className="font-bold text-lg text-tertiary">
            {queueData} patients
          </p>
          <p className="text-sm text-[#C4C4C4]">in line</p>
        </div>
        <div className="w-1/2">
          <p className="font-bold text-lg text-tertiary">
            {queueData * 3} minutes
          </p>
          <p className="text-sm text-[#C4C4C4]">waiting time</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <p className="font-bold text-lg text-tertiary">3 minutes</p>
          <p className="text-sm text-[#C4C4C4]">per 1 patient</p>
        </div>
        <div className="w-1/2">
          <p className="font-bold text-lg text-tertiary">{timePageLoad}</p>
          <p className="text-sm text-[#C4C4C4]">Last data fetch</p>
        </div>
      </div>
    </div>
  );
}
