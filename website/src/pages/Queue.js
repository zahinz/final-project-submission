import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";

// redux
import { useSelector } from "react-redux";

// assets
import Img from "../assets/img/1.jpeg";
import CurrentData from "../components/Queue/CurrentData";
import CurrentDoctor from "../components/Queue/CurrentDoctor";
import QueueForm from "../components/Queue/QueueForm";
import QueueTicket from "../components/Queue/QueueTicket";

export default function Queue() {
  const queueAlready = useSelector((state) => state.queue.queue.queueStatus);
  const [contentIndex, setContentIndex] = useState(0);


  useEffect(() => {
    if (queueAlready) {
      setContentIndex(2);
    }
  }, [queueAlready]);

  console.log(queueAlready);

  function didSwipe(e) {
    console.log(e);
    setContentIndex(e);
  }

  function btnClick(e) {
    console.log(e);
    e === 0 ? setContentIndex(1) : setContentIndex(1);
  }
  return (
    <div className="h-screen w-screen bg-primary flex justify-center items-center">
      <div className="h-4/5 w-[1000px] flex rounded-lg overflow-hidden">
        <div
          className="w-[calc(100%-400px)] h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${Img})` }}
        >
          <div className="h-full w-full bg-gradient-to-t from-my_dark_gray flex flex-col items-start justify-end p-10">
            <p className="font-bold text-5xl text-white mb-3">Medicio Clinic</p>
            <p className="text-xl text-white">Cyberjaya, Selangor</p>
          </div>
        </div>
        <div className="bg-white h-full w-[400px] flex flex-col justify-end items-center px-2">
          <div className="h-full w-full flex flex-col items-center justify-end overflow-hidden p-8">
            <CurrentDoctor />
            <SwipeableViews
              enableMouseEvents
              autoplay={true}
              onChangeIndex={(e) => didSwipe(e)}
              index={contentIndex}
              animateHeight={true}
              style={{ width: "105%" }}
              disabled={queueAlready}
            >
              <CurrentData />
              <QueueForm
                contentIndex={contentIndex}
                setContentIndex={setContentIndex}
              />
              <QueueTicket />
            </SwipeableViews>

            {contentIndex < 2 ? (
              <button
                form={contentIndex === 0 ? "" : "QueueForm"}
                type={contentIndex === 0 ? "button" : "submit"}
                onClick={() => btnClick(contentIndex)}
                className="w-full bg-secondary mt-6 rounded-lg p-2 text-white font-bold"
              >
                {contentIndex === 0 ? "Queue" : "Submit"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
