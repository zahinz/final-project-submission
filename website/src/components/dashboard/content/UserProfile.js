import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// react router
import { Link, useHistory } from "react-router-dom";
import { string } from "yup/lib/locale";

// redux
import { useSelector, useDispatch } from "react-redux";

export default function UserProfile(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // current user
  const currentUser = useSelector((state) => state.auth.currentUser.userData);

  // useState
  const [serverError, setServerError] = useState({});

  // useHistory
  const history = useHistory();

  // formik function start here
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[]*)|(\\([0-9]{2,3}\\)[]*)|([0-9]{2,4})[]*)*?[0-9]{3,4}?[]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      title: currentUser.title,
      name: currentUser.name,
      email: currentUser.email,
      password: "",
      passwordConfirmation: "",
      nric: currentUser.nric,
      phoneNumber: currentUser.phone,
    },

    // input validation
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 8 chars minimum."),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      nric: Yup.string()
        .required("NRIC is required")
        .min(12, "NRIC should be 12 chars minimum"),
      phoneNumber: Yup.string()
        .required("Phone number is required.")
        .matches(
          phoneRegExp,
          "Phone number is not valid, only numbers are allowed."
        ),
    }),

    // submit function
    onSubmit: (values) => {
      console.log("submit!", values);

      // Send a POST request
      // get and pass the token
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/user-update`,
          {
            title: values.title,
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
            nric: values.nric,
            phone: values.phoneNumber,
            title: values.title,
          },
          config
        )
        .then(function (response) {
          console.log(response);
          // window.location.reload(true);
        })
        .catch(function (error) {
          // console.log(error.response.data);
          setServerError(error.response.data);
        });
    },
  });
  return (
    <div className="h-full">
      {/* new doctor form start here */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col h-full pb-[45px] md:w-full"
      >
        <div>
          <div className="w-full flex justify-between">
            {/* title input */}
            <div className="flex flex-col mb-3 w-[calc(30%-5px)]">
              <label htmlFor="title" className="text-sm text-my_dark_gray mb-2">
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Dr"
                className="text-sm bg-input_field p-2 rounded-lg mb-1"
              />
              {/* error message formik*/}
              {formik.touched.title && formik.errors.title ? (
                <div className="text-secondary text-xs mb-1">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            {/* name input */}
            <div className="flex flex-col mb-3 w-[calc(70%-5px)]">
              <label htmlFor="name" className="text-sm text-my_dark_gray mb-2">
                Name*
              </label>
              <input
                type="text"
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
          </div>

          {/* email input */}
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-sm text-my_dark_gray mb-2">
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
            {serverError.email
              ? serverError.email.map(() => (
                  <div className="text-secondary text-xs mb-1">
                    {serverError.email}
                  </div>
                ))
              : null}
          </div>

          {/* password input */}
          <div className="flex flex-col mb-3">
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

          <div className="flex justify-between">
            {/* nric input */}
            <div className="flex flex-col mb-3 w-[calc(50%-5px)]">
              <label htmlFor="nric" className="text-sm text-my_dark_gray mb-2">
                NRIC*
              </label>
              <input
                type="text"
                id="nric"
                name="nric"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nric}
                placeholder="IC number"
                className="text-sm bg-input_field p-2 rounded-lg mb-1"
              />
              {/* error message formik*/}
              {formik.touched.nric && formik.errors.nric ? (
                <div className="text-secondary text-xs mb-1">
                  {formik.errors.nric}
                </div>
              ) : null}
            </div>
            {/* phoneNumber input */}
            <div className="flex flex-col mb-3 w-[calc(50%-5px)]">
              <label
                htmlFor="phoneNumber"
                className="text-sm text-my_dark_gray mb-2"
              >
                Phone number*
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className="text-sm bg-input_field p-2 rounded-lg mb-1"
                placeholder="0123345600"
              />
              {/* error message formik*/}
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-secondary text-xs mb-1">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-tertiary border-tertiary border-2 mt-6 rounded-lg p-2 text-white font-bold"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
