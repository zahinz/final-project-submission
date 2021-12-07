import React from "react";

// navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// react redux
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Logout from "./component/Logout";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={({route, navigation}) => ({
              headerStyle: {
                backgroundColor: "#451846",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
                fontSize: 20,
              },
              headerBackVisible: false,
              headerRight: () => <Logout navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
