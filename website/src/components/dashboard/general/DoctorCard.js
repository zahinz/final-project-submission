import React, { useEffect, useState } from "react";
import EditDoctorForm from "../../doctor/EditDoctorForm";

// asset
import { BsFillPersonCheckFill, BsPencilSquare } from "react-icons/bs";

// redux
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";

export default function DoctorCard(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // state of edit doctor form
  const [showEditDoctorForm, setShowEditDoctorForm] = useState(false);

  function editDoctor(id) {
    setShowEditDoctorForm(true);
  }

  function isOnDutyDoctor(id) {
    console.log(id);
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/isonduty/${id}`,
        {},
        config
      )
      .then(function (response) {
        console.log(response);
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // on duty timer
  const [doctorTimer, setDoctorTimer] = useState("");

  useEffect(() => {
    let myTime = setInterval(() => {
      let startTime = new Date(props.updatedAt).getTime();
      let momentStartTime = moment(startTime).format(" h:mm:ss a, MMM Do YYYY");
      // console.log("START", momentStartTime);

      let currentTime = Date.now();
      let momentCurrentTime = moment(currentTime).format(
        " h:mm:ss a, MMM Do YYYY"
      );
      // console.log("CURRENT", momentCurrentTime);

      setDoctorTimer(moment.duration(currentTime - startTime).humanize());

      // setDoctorTimer(duration);
    }, 1000);
    return () => clearInterval(myTime);
  });

  return (
    <>
      {showEditDoctorForm ? (
        <EditDoctorForm
          showEditDoctorForm={showEditDoctorForm}
          setShowEditDoctorForm={setShowEditDoctorForm}
          doctorId={props.doctorId}
        />
      ) : null}
      {props.isDoctorIn ? (
        //   clocked in
        <div className="bg-[#ccebfc] w-full rounded-lg p-5 flex justify-between items-center mb-2">
          <p className="text-[#2D2D2D] font-bold text-sm">
            {props.title} {props.name}
          </p>
          <div className="px-3 py-2 rounded-lg text-[#8C8C8C] text-xs font-bold">
            {doctorTimer ? doctorTimer : "Starting"}
          </div>
        </div>
      ) : (
        //   clocked out
        <div className="bg-[#F9FAFB] w-full rounded-lg p-5 flex justify-between items-center mb-2">
          <p className="text-[#8C8C8C] font-bold text-sm">{props.name}</p>
          <div className="flex justify-between items-center">
            <div
              className="px-3 py-2 text-xs text-secondary font-bold cursor-pointer"
              onClick={() => editDoctor(props.doctorId)}
            >
              Edit
            </div>
            <div
              className="px-3 py-2 rounded-lg bg-secondary text-white text-xs font-bold cursor-pointer"
              onClick={() => isOnDutyDoctor(props.doctorId)}
            >
              <BsFillPersonCheckFill size="1rem" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
