import axios from "axios";
import React, { useEffect, useState } from "react";

// assets
import { BsFillPersonFill } from "react-icons/bs";

// react router
import { Link } from "react-router-dom";

export default function CurrentDoctor() {
  const [CurrentDoctor, setCurrentDoctor] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/isonduty`)
      .then(function (res) {
        console.log(res.data);
        setCurrentDoctor(res.data[0]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <>
      {CurrentDoctor ? (
        <div className="w-full h-auto flex justify-start items-center border-[#C4C4C4] pb-10 border-b-[1px]">
          <div className="bg-[#c4c4c4] h-[70px] w-[70px] rounded-full overflow-hidden mr-4">
            <div className="h-full w-full flex justify-center items-end relative">
              <BsFillPersonFill
                style={{
                  position: "absolute",
                  bottom: -10,
                  width: "107%",
                  height: "107%",
                  color: "white",
                }}
              />
            </div>
          </div>
          <div className="w-[calc(100% - 70px)]">
            <p className="text-xs text-[#8C8C8C]">Doctor on duty</p>
            <p className="font-bold text-[#2D2D2D] mt-1 text-base">
              {CurrentDoctor.title} {CurrentDoctor.name}
            </p>
            <div className="flex justify-start items-center mt-2">
              <p className="text-xs bg-tertiary px-2 py-1 rounded-xl text-white mr-2">
                {CurrentDoctor.graduated_from}
              </p>
              <a
                href={`https://meritsmmc.moh.gov.my/search/registeredDoctor?provisional=${CurrentDoctor.mmc_registration_number}`}
                target="blank"
              >
                <p className="text-xs text-tertiary underline cursor-pointer">
                  Check MMC status
                </p>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
