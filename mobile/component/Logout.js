import React from "react";
import { Button, Alert } from "react-native";

import { logout } from "../reducers/Auth";

// redux
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_LOCALHOST } from "../const";

export default function Logout(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);
  console.log(props);
  // declare dispatch for react redux
  const dispatch = useDispatch();

  // logout function
  function submitLogout() {
    //   get the pass the token
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };

    axios
      .post(`${API_LOCALHOST}/auth/logout`, {}, config)
      .then(function (response) {
        console.log(response);
        dispatch(logout());
        props.navigation.navigate("Login");
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(logout());
        props.navigation.navigate("Login");
      });
  }

  function openTwoButtonAlert() {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => submitLogout() },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  return (
    <Button onPress={() => openTwoButtonAlert()} title="Logout" color="white" />
  );
}
