import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/Auth";

// react router
import { Link, useHistory } from "react-router-dom";

// assets
import background from "../assets/img/1.jpeg";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function StaffLogin(props) {
  // history
  const history = useHistory();

  // check token
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  useEffect(() => {
    AuthToken ? history.push("/dashboard") : console.log();
  });

  // useState
  const [serverError, setServerError] = useState(null);
  const [successRegistration, setSuccessRegistration] = useState("");

  // success registration state
  useEffect(() => {
    // console.log(props.location.search.split("&")[1]);
    const isRegistered = props.location.search;
    isRegistered === ""
      ? console.log("Not come from registration")
      : setSuccessRegistration(props.location.search.split("&")[1]);
  }, [successRegistration]);

  // declare dispatch for react redux
  const dispatch = useDispatch();

  // formik function start here
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // input validation
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
    }),

    // submit function
    onSubmit: (values) => {
      console.log("submit!", values);
      // Send a POST request
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
          email: values.email,
          password: values.password,
        })
        .then(function (response) {
          console.log(response);
          dispatch(
            login({
              token: response.data.access_token,
              userData: response.data.user,
            })
          );
        })
        .catch(function (error) {
          console.log(error.response.statusText);
          let statusError = error.response.statusText;

          switch (statusError) {
            case "Forbidden":
              setServerError("User not authorised. Contact admin for support.");
              break;

            case "Unauthorized":
              setServerError("Incorrect password.");
              break;
            default:
          }
        });
    },
  });
  return (
    <>
      {/* {console.log(successRegistration)} */}
      <div className="w-screen h-screen flex justify-between items-center">
        {/* left column */}
        <div className="w-[550px] h-full flex justify-center items-end">
          <div className="w-3/5 h-auto pb-[80px]">
            <p className=" text-3xl font-bold text-dark_gray mb-8">Login</p>

            {/* login form start here */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col mb-6">
              {/* email input */}
              <div className="flex flex-col mb-3">
                <label
                  htmlFor="email"
                  className="text-sm text-my_dark_gray mb-2"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="text-sm bg-input_field p-2 rounded-lg mb-1"
                />
                {/* error message formik*/}
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-secondary text-xs mb-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              {/* password input */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm text-my_dark_gray mb-2"
                >
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="text-sm bg-input_field p-2 rounded-lg mb-1"
                />
                {/* error message formik*/}
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-secondary text-xs mb-1">
                    {formik.errors.password}
                  </div>
                ) : null}

                {/* error message server */}
                {serverError ? (
                  <div className="text-secondary text-xs mb-1">
                    {serverError}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-secondary mt-6 rounded-lg p-2 text-white font-bold"
              >
                Login
              </button>
            </form>

            {/* success alert */}
            {successRegistration ? (
              <div className=" bg-input_field px-2 py-8 text-xs flex justify-center items-center mb-5 rounded-lg text-gray-500">
                <span className="text-base mr-2 text-success_green">
                  <BsFillCheckCircleFill />
                </span>{" "}
                New user for {successRegistration} is created.
              </div>
            ) : null}
            <p className="text-sm text-my_dark_gray mb-20">
              New user?{" "}
              <Link to="/register">
                <span className="font-bold text-secondary">Register here</span>
              </Link>
            </p>
            <p className="text-input_placeholder text-sm">
              2021 Zahinz All rights reserved.
            </p>
          </div>
        </div>

        {/* right column */}
        <div
          className="h-full w-[calc(100vw-550px)] bg-center bg-cover flex justify-end items-center rounded-l-2xl"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="w-full h-full bg-gradient-to-l from-my_dark_gray flex flex-col items-end justify-start pt-[100px] pr-[100px]">
            <p className="font-bold text-5xl text-white mb-3">Medicio Clinic</p>
            <p className="text-xl text-white">Cyberjaya, Selangor</p>
          </div>
        </div>
      </div>
    </>
  );
}
