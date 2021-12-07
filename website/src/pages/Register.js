import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


// react router
import { Link, useHistory } from "react-router-dom";

import background from "../assets/img/1.jpeg";

export default function StaffLogin() {
  // useState
  const [serverEmailError, setServerEmailError] = useState(null);
  const [redirectLogin, setRedirectLogin] = useState(false);

  // useHistory
  const history = useHistory();

  // formik function start here
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    // input validation
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 8 chars minimum."),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),

    // submit function
    onSubmit: (values) => {
      console.log("submit!", values);
      // Send a POST request
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        })
        .then(function (response) {
          console.log(response);
          setRedirectLogin(true);
          return history.push({
            pathname: "/",
            search: `?registration=success&${values.email}`, // query string
            state: {
              // location state
              isRegistered: true,
            },
          });
        })
        .catch(function (error) {
          console.log(error.response.data.email);
          setServerEmailError(error.response.data.email);
        });
    },
  });
  return (
    <>
      <div className="w-screen h-screen flex justify-between items-center">
        {/* left column */}
        <div className="w-[550px] h-full flex justify-center items-end">
          <div className="w-3/5 h-auto pb-[80px]">
            <p className=" text-3xl font-bold text-dark_gray mb-8">Register</p>

            {/* login form start here */}
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col mb-10"
            >
              {/* name input */}
              <div className="flex flex-col mb-3">
                <label
                  htmlFor="name"
                  className="text-sm text-my_dark_gray mb-2"
                >
                  Name*
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="NRIC full name"
                  className="text-sm bg-input_field p-2 rounded-lg mb-1"
                />
                {/* error message formik*/}
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-secondary text-xs mb-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

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
                {/* error message server */}
                {serverEmailError
                  ? serverEmailError.map(() => (
                      <div className="text-secondary text-xs mb-1">
                        {serverEmailError}
                      </div>
                    ))
                  : null}
              </div>

              {/* password input */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm text-my_dark_gray mb-2"
                >
                  Password*
                </label>
                {/* password */}
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Insert password"
                  className="text-sm bg-input_field p-2 rounded-lg mb-2"
                />
                {/* confirm password */}
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirmation}
                  placeholder="Repeat password"
                  className="text-sm bg-input_field p-2 rounded-lg mb-1"
                />
                {/* error message formik*/}
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-secondary text-xs mb-1">
                    {formik.errors.password}
                  </div>
                ) : null}
                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                  <div className="text-secondary text-xs mb-1">
                    {formik.errors.passwordConfirmation}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-secondary mt-6 rounded-lg p-2 text-white font-bold"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-my_dark_gray mb-20">
              Existing user?{" "}
              <Link to="/">
                <span className="font-bold text-secondary">Login here</span>
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
