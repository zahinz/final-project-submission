import React, { useEffect, useState } from "react";

// components
import TopNav from "../components/dashboard/general/TopNav";
import LeftNav from "../components/dashboard/general/LeftNav";

// redux
import { useSelector } from "react-redux";

// react router
import { useHistory } from "react-router";
import MainDashboard from "../components/dashboard/content/MainDashboard";
import PatientList from "../components/dashboard/content/PatientList";
import DoctorSchdule from "../components/dashboard/content/DoctorSchdule";
import UserProfile from "../components/dashboard/content/UserProfile";
import RightNav from "../components/dashboard/general/RightNav";
import NewDoctorForm from "../components/doctor/NewDoctorForm";

export default function Dashboard(props) {
  // state
  const [active, setActive] = useState(1);

  // menuList
  const menuItem = [
    {
      name: "Dashboard",
      icon: "BsFillBarChartFill",
      component: <MainDashboard />,
    },
    {
      name: "Patient list",
      icon: "BsCalendar2WeekFill",
      component: <PatientList />,
    },
    {
      name: "Doctors schedule",
      icon: "BsFillPeopleFill",
      component: <DoctorSchdule />,
    },
  ];

  // current user
  const currentUser = useSelector((state) => state.auth.currentUser.userData);

  // check token
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);
  const history = useHistory();

  useEffect(() => {
    !AuthToken ? history.push("/") : console.log("NO");
  });

  // register new doctor modal
  const [showNewDoctorForm, setShowNewDoctorForm] = useState(false);

  return (
    <>
      {showNewDoctorForm ? (
        <NewDoctorForm
          showNewDoctorForm={showNewDoctorForm}
          setShowNewDoctorForm={setShowNewDoctorForm}
        />
      ) : null}

      <div className="h-screen w-screen flex">
        <div className="flex justify-center items-center h-full w-[290px] py-[50px] bg-[#f9f9f9]">
          <LeftNav active={active} setActive={setActive} menuItem={menuItem} />
        </div>
        <div className="h-full w-[calc(100vw-290px)]">
          <div className="w-full h-[120px] flex items-center p-12">
            <TopNav email={currentUser.email} setActive={setActive} />
          </div>
          <div className="flex w-full h-[calc(100%-120px)]">
            <div className="h-[calc(100%-45px)] lg:w-[calc(100%-350px)] border-r-2 mr-[45px] px-[45px] md:w-full md:border-none z-0">
              {/* ? NEW KNOWLEDGE */}
              {active !== null ? menuItem[active].component : <UserProfile />}
            </div>
            <div className="h-full w-[350px] md:hidden lg:block z-20">
              <RightNav
                showNewDoctorForm={showNewDoctorForm}
                setShowNewDoctorForm={setShowNewDoctorForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
