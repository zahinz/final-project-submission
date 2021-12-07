import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// react router
import { Link, useHistory } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

export default function NewDoctorForm(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  // useState
  const [serverError, setServerError] = useState({});

  // useHistory
  const history = useHistory();

  // formik function start here
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[]*)|(\\([0-9]{2,3}\\)[]*)|([0-9]{2,4})[]*)*?[0-9]{3,4}?[]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      title: "Dr",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      nric: "",
      phoneNumber: "",
      mmcRegistrationNumber: "",
      graduatedFrom: "",
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
      phoneNumber: Yup.string().required('Phone number is required').matches(
        phoneRegExp,
        "Phone number is not valid, only numbers are allowed."
      ),
      //   title: Yup.string().required("Title is required"),
      mmcRegistrationNumber: Yup.string().required("MMC number is required"),
      graduatedFrom: Yup.string().required("Please key in place of graduate"),
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
          `${process.env.REACT_APP_BACKEND_URL}/auth/doctors`,
          {
            title: values.title,
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
            nric: values.nric,
            phone: values.phoneNumber,
            title: values.title,
            mmc_registration_number: values.mmcRegistrationNumber,
            graduated_from: values.graduatedFrom,
          },
          config
        )
        .then(function (response) {
          console.log(response);
          window.location.reload(true);
          props.setShowNewDoctorForm(false);
        })
        .catch(function (error) {
          // console.log(error.response.data);
          setServerError(error.response.data);
          // console.log(serverError);
        });
    },
  });
  return (
    <div
      className="bg-white bg-opacity-90 h-screen w-screen absolute left-0 top-0 flex justify-center items-center z-50"
      onClick={() => props.setShowNewDoctorForm(false)}
    >
      <div
        className="w-[600px] px-10"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {/* new doctor form start here */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
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

          {/* mmcRegistrationNumber input */}
          <div className="flex flex-col mb-3">
            <label
              htmlFor="mmcRegistrationNumber"
              className="text-sm text-my_dark_gray mb-2"
            >
              MMC registration number*
            </label>
            <input
              type="text"
              id="mmcRegistrationNumber"
              name="mmcRegistrationNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mmcRegistrationNumber}
              placeholder="MMC number"
              className="text-sm bg-input_field p-2 rounded-lg mb-1"
            />
            {/* error message formik*/}
            {formik.touched.mmcRegistrationNumber &&
            formik.errors.mmcRegistrationNumber ? (
              <div className="text-secondary text-xs mb-1">
                {formik.errors.mmcRegistrationNumber}
              </div>
            ) : null}
          </div>

          {/* graduatedFrom input */}
          <div className="flex flex-col mb-3">
            <label
              htmlFor="graduatedFrom"
              className="text-sm text-my_dark_gray mb-2"
            >
              Graduated from*
            </label>
            <input
              type="text"
              id="graduatedFrom"
              name="graduatedFrom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.graduatedFrom}
              placeholder="Place of graduation"
              className="text-sm bg-input_field p-2 rounded-lg mb-1"
            />
            {/* error message formik*/}
            {formik.touched.graduatedFrom && formik.errors.graduatedFrom ? (
              <div className="text-secondary text-xs mb-1">
                {formik.errors.graduatedFrom}
              </div>
            ) : null}
            {/* error message server */}
            {serverError.graduated_from
              ? serverError.graduated_from.map(() => (
                  <div className="text-secondary text-xs mb-1">
                    {serverError.graduated_from}
                  </div>
                ))
              : null}
          </div>

          <button
            type="submit"
            className="bg-secondary mt-6 rounded-lg p-2 text-white font-bold"
          >
            Register new doctor
          </button>
        </form>
      </div>
    </div>
  );
}
