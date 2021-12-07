import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// assets
import { BsFillPersonPlusFill } from "react-icons/bs";
import DoctorCard from "./DoctorCard";
import axios from "axios";
import { addDoctor } from "../../../reducers/Doctors";

export default function RightNav(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // declare dispatch for react redux
  const dispatch = useDispatch();

  // list doctor state
  const [doctorsList, setDoctorList] = useState([]);

  function getDoctorData() {
    //   get the token for header
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/doctors`, config)
      .then(function (res) {
        console.log(res.data);
        dispatch(addDoctor(res.data));
        setDoctorList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div className="w-full h-full pr-12 pb-12">
      <div className="w-full h-full flex flex-col justify-between align-center">
        <div className="text-center pb-5 font-bold text-[#8C8C8C]">Doctor on duty</div>
        <div className="h-[calc(100%-60px)] w-full rounded-lg overflow-scroll">
          {/* doctor list goes here */}
          {doctorsList.map((list) => (
            <DoctorCard
              key={list.doctor.id}
              name={list.name}
              isDoctorIn={list.doctor.is_on_duty}
              doctorId={list.doctor.id}
              updatedAt={list.doctor.updated_at}
            />
          ))}
        </div>
        <div
          className="w-full h-[40px] bg-tertiary text-white rounded-lg flex justify-center items-center cursor-pointer"
          onClick={() => props.setShowNewDoctorForm(true)}
        >
          <span className="text-2xl mr-3">
            <BsFillPersonPlusFill size="1.1rem" />
          </span>
          <span className="text-sm font-semibold mr-3">New doctor</span>
        </div>
      </div>
    </div>
  );
}
