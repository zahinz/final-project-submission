import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import tw from "twrnc";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API_LOCALHOST } from "../../const";

// redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/Auth";

export default function Login(props) {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  // declare dispatch for react redux
  const dispatch = useDispatch();

  // get the loggedIn status from redux
  const isLoggedIn = useSelector((state) => state.auth.currentUser.isLoggedIn);
  useEffect(() => {
    isLoggedIn ? props.navigation.navigate("Dashboard") : console.log();
  });

  // useState
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={tw`pb-[50px]`}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={tw`w-full h-full flex justify-end`}>
            <View
              style={tw`flex justify-end h-[70%] bg-[#451846] px-[1.25rem] pb-[70px] mb-[60px]`}
            >
              <Text style={tw`text-white text-5xl font-bold`}>
                Medicio Clinic
              </Text>
              <Text style={tw`text-white text-xl font-bold`}>
                Cyberjaya, Selangor
              </Text>
            </View>
            <View style={tw`flex justify-end h-auto px-[1.25rem] pb-[60px]`}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  setIsLoading(true);
                  axios
                    .post(`${API_LOCALHOST}/auth/login`, {
                      email: values.email,
                      password: values.password,
                    })
                    .then(function (response) {
                      // console.log(response.data.access_token);
                      setIsLoading(false);
                      dispatch(
                        login({
                          token: response.data.access_token,
                          userData: response.data.user,
                          isLoggedIn: true,
                        })
                      );
                      // props.navigation.navigate("Dashboard");
                    })
                    .catch(function (error) {
                      console.log(error.response.status);
                      setIsLoading(false);
                      let statusError = error.response.status;

                      switch (statusError) {
                        case 403:
                          setServerError(
                            "User not authorised. Contact admin for support."
                          );
                          break;

                        case 401:
                          setServerError("Incorrect password.");
                          break;
                        default:
                      }
                    });
                }}
                validationSchema={yup.object().shape({
                  email: yup
                    .string()
                    .email()
                    .required("Please fill in your email"),
                  password: yup
                    .string()
                    .min(4)
                    .max(10, "Password should not excced 10 chars.")
                    .required(),
                })}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  isValid,
                  handleSubmit,
                }) => (
                  <View>
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                      placeholder="E-mail"
                      style={tw`bg-gray-200 p-4 rounded-lg mb-4`}
                    />
                    {touched.email && errors.email && (
                      <Text style={tw`text-[#ED3E63] text-xs mb-3 pl-4`}>
                        {errors.email}
                      </Text>
                    )}
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Password"
                      onBlur={() => setFieldTouched("password")}
                      secureTextEntry={true}
                      style={tw`bg-gray-200 p-4 rounded-lg mb-4`}
                    />
                    {touched.password && errors.password && (
                      <Text style={tw`text-[#ED3E63] text-xs mb-3 pl-4`}>
                        {errors.password}
                      </Text>
                    )}
                    {/* error message server */}
                    {serverError ? (
                      <Text style={tw`text-[#ED3E63] text-xs mb-3 pl-4`}>
                        {serverError}
                      </Text>
                    ) : null}
                    {isLoading ? (
                      <Pressable style={tw`bg-[#8C8C8C] mt-6 rounded-lg p-4`}>
                        <Text
                          style={tw`text-base text-white font-bold text-center`}
                        >
                          Signing in..
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        title="Submit"
                        disabled={!isValid}
                        onPress={handleSubmit}
                        style={tw`bg-[#ED3E63] mt-6 rounded-lg p-4`}
                      >
                        <Text
                          style={tw`text-base text-white font-bold text-center`}
                        >
                          Login
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
