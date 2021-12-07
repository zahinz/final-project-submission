import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addQueue } from "../../reducers/Queue";

// assets
import {
  BsAlarmFill,
  BsInfoCircleFill,
  BsEmojiSmileFill,
} from "react-icons/bs";
import axios from "axios";

export default function QueueForm(props) {
  // declare dispatch for react redux
  const dispatch = useDispatch();

  // formik function start here
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[]*)|(\\([0-9]{2,3}\\)[]*)|([0-9]{2,4})[]*)*?[0-9]{3,4}?[]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },

    // input validation
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phoneNumber: Yup.string().matches(
        phoneRegExp,
        "Phone number is not valid, only numbers are allowed."
      ),
    }),

    // submit function
    onSubmit: (values) => {
      console.log("submit!", values);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/queue`, {
          name: values.name,
          phone: values.phoneNumber,
        })
        .then(function (response) {
          dispatch(
            addQueue({
              queueStatus: true,
              queueData: response.data,
            })
          );
          console.log(response.data);

          props.setContentIndex(2);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
  });
  return (
    <>
      {/* left column */}
      <div className="w-full h-auto py-8 px-2 mx-auto">
        {/* login form start here */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col"
          id="QueueForm"
        >
          {/* email input */}
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-sm text-my_dark_gray mb-2">
              Patient name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="text-sm bg-input_field p-2 rounded-lg mb-1"
              placeholder="NRIC full name"
            />
            {/* error message formik*/}
            {formik.touched.name && formik.errors.name ? (
              <div className="text-secondary text-xs mb-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          {/* phoneNumber input */}
          <div className="flex flex-col">
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
        </form>

        <div className="pt-8">
          <div className="flex items-center text-secondary pb-3">
            <BsAlarmFill size="1.2rem" />
            <p className="text-sm ml-3 text-[#2D2D2D]">
              Kindly arrive at the clinic in 2 hours.
            </p>
          </div>
          <div className="flex items-center text-secondary pb-3">
            <BsInfoCircleFill size="1.55rem" />
            <p className="text-sm ml-3 text-[#2D2D2D]">
              Complete patient's registration will be done at the clinic.
            </p>
          </div>
          <div className="flex items-center text-secondary">
            <BsEmojiSmileFill size="1.2rem" />
            <p className="text-sm ml-3 text-[#2D2D2D]">See you there!</p>
          </div>
        </div>
      </div>
    </>
  );
}
