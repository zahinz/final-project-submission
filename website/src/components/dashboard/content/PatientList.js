import axios from "axios";
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import WaitingPatient from "../../table/WaitingPatient";

export default function PatientList() {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // patient list state
  const [patientList, setPatientList] = useState([]);

  function getPatientData() {
    console.log("calling data");
    //   get the token for header
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/queue`, config)
      .then(function (res) {
        console.log(res.data.data);
        setPatientList(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getPatientData();
  }, []);

  return (
    <div className="w-full">
      <div className="text-left pb-5 font-bold text-[#8C8C8C]">
        Patient list
      </div>
      <div className="h-[600px] w-full">
        <WaitingPatient patients={patientList} />
      </div>
    </div>
  );
}
