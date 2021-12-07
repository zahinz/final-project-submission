import axios from "axios";
import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// assets
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../../reducers/Auth";

export default function LogoutBtn() {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // declare dispatch for react redux
  const dispatch = useDispatch();

  // logout function
  function submitLogout() {
    console.log(AuthToken);

    //   get the pass the token
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {}, config)
      .then(function (response) {
        console.log(response);
        dispatch(logout());
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(logout());
      });
  }
  return (
    <div
      className="w-full h-[40px] bg-secondary text-white rounded-lg flex justify-center items-center cursor-pointer"
      onClick={() => submitLogout()}
    >
      <span className="text-2xl mr-3">
        <IoLogOutOutline />
      </span>
      <span className="text-sm font-semibold mr-3">Logout</span>
    </div>
  );
}
