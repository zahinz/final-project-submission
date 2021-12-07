import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";

// import localhost
import { API_LOCALHOST } from "../../const";

// redux
import { useSelector } from "react-redux";
import axios from "axios";
import UserList from "../../component/UserList";

export default function Dashboard() {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);
  const isLoggedIn = useSelector((state) => state.auth.currentUser.isLoggedIn);

  // declare keyboard offset
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  // use state
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [trigger, setTrigger] = useState(false);

  // get API

  function getUserData() {
    //   get the token for header
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    axios
      .get(`${API_LOCALHOST}/auth/admin`, config)
      .then(function (res) {
        console.log(res.data);
        setUsersList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!trigger) {
      getUserData();
    }
  }, [trigger]);

  return (
    <View>
      <SafeAreaView
        style={tw`h-full flex justify-start items-center mx-[0.8rem]`}
      >
        {/* {usersList.map((list) => (
              <UserList name={list.name} email={list.email} />
            ))} */}
        <FlatList
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              onRefresh={() => getUserData()}
            />
          }
          data={usersList}
          style={tw`w-full`}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => (
            <UserList
              id={item.item.id}
              name={item.item.name}
              email={item.item.email}
              role={item.item.roles}
              setTrigger={setTrigger}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
