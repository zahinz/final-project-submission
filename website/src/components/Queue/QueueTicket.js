import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

export default function QueueTicket() {
  const queueData = useSelector((state) => state.queue.queue.queueData);

  // console.log(queuePatient.patient.name);

  console.log(queueData);
  return (
    <div className="w-full h-auto py-8 px-2 mx-auto">
      <div className="bg-[#F2F2F2] rounded-lg w-full h-auto flex flex-col justify-center items-center py-6 text-center mb-2">
        <div className=" flex flex-col justify-center items-center">
          {queueData ? (
            <>
              <div className="text-3xl mr-2 text-success_green mb-2">
                <BsFillCheckCircleFill />
              </div>
              <p className="text-[#2D2D2D] font-bold text-xs">
                We received your information
              </p>
            </>
          ) : null}
        </div>
        <div className=" text-[#8C8C8C] mb-4 ">
          <p className="text-xs mb-1">Patient's name</p>
          <p className="font-bold text-xs">
            {queueData ? queueData.patient.name : null}
          </p>
        </div>
        <div className=" text-[#8C8C8C] mb-4">
          <p className="text-xs mb-1">Phone</p>
          <p className="font-bold text-xs">
            {queueData ? queueData.patient.phone : null}
          </p>
        </div>
        <div className=" text-[#8C8C8C]">
          <p className="text-xs mb-1">
            Data updated on{" "}
            {queueData
              ? moment(new Date(queueData.waiting.created_at).getTime()).format(
                  " h:mm a, MMM Do YY"
                )
              : null}
          </p>
        </div>
      </div>
      <div className="w-full text-white">
        <div className="bg-secondary flex justify-evenly items-center pt-7 pb-5 rounded-t-lg">
          <div className="w-auto text-center">
            <p className="font-bold">12 patients</p>
            <p className="text-xs">waiting in line</p>
          </div>
          <div className="w-auto text-center">
            <p className="font-bold">30 minutes</p>
            <p className="text-xs">until your turn</p>
          </div>
        </div>
        <div className="bg-secondary flex justify-center items-center h-2 border-dashed border-white border-b-2 pt-4 relative">
          <div className="w-2 h-4 absolute bg-white rounded-r-full left-0"></div>
          <div className="w-2 h-4 absolute bg-white rounded-l-full right-0"></div>
        </div>
        <div className="bg-secondary flex justify-center items-center h-3"></div>
        <div className="bg-secondary flex justify-center items-center pt-4 pb-6 rounded-b-lg">
          <div className="w-full text-center">
            <p className="text-xs">Your number</p>
            <p className="text-3xl font-bold">
              {queueData ? queueData.waiting.queue_number : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
