import axios from "axios";
import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import tw from "twrnc";

// import localhost
import { API_LOCALHOST } from "../const";

// redux
import { useSelector } from "react-redux";

export default function UserList(props) {
  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  //   get the token for header
  const config = {
    headers: { Authorization: `Bearer ${AuthToken}` },
  };

  function approveUser(id) {
    console.log(id);
      setIsLoading(true);
      props.setTrigger(true);
    // Send a POST request
    axios
      .post(`${API_LOCALHOST}/auth/admin/set-staff/${id}`, {}, config)
      .then(function (response) {
        console.log(response);
          setIsLoading(false);
      props.setTrigger(false);
          
      })
      .catch(function (error) {
        console.log(error.response.statusText);
          setIsLoading(false);
      props.setTrigger(false);
          
      });
  }
  return (
    <>
      {props.role[0] === undefined ? (
        <View
          style={tw`bg-[#F9F9F9] w-full mt-4 px-6 py-8 flex flex-row justify-between items-center`}
        >
          <View>
            <Text style={tw`text-lg font-bold`}>{props.name}</Text>
            <Text>{props.email}</Text>
            <Text>{props.role.map((list) => list.name)}</Text>
          </View>
          <View>
            {isLoading ? (
              <Pressable style={tw`bg-[#ED3E63] rounded-full p-3`}>
                <Text style={tw`text-xs text-white font-bold text-center`}>
                  Approving...
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={tw`bg-[#ED3E63] rounded-full p-3`}
                onPress={() => approveUser(props.id)}
              >
                <Text style={tw`text-xs text-white font-bold text-center`}>
                  Approve
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <View
          style={tw`bg-[#F9F9F9] w-full mt-4 px-6 py-8 flex flex-row justify-between items-center`}
        >
          <View>
            <Text style={tw`text-lg font-bold`}>{props.name}</Text>
            <Text>{props.email}</Text>
            <Text
              style={tw`bg-[#319BD3] text-white p-1 mt-3 w-[70px] text-center`}
            >
              {props.role.map((list) => list.name)}
            </Text>
          </View>
          <View>
            <Pressable style={tw`bg-[#F9F9F9] rounded-full p-3`}>
              <Text style={tw`text-xs text-[#8C8C8C] font-bold text-center`}>
                Approved
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}
