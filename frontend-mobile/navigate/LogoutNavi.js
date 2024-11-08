import React from "react";
import Login from "../routes/loggedOut/Login";
import InputUserInfo1 from "../routes/loggedOut/InputUserInfo1";
import InputUserInfo2 from "../routes/loggedOut/InputUserInfo2";
import InputUserInfo3 from "../routes/loggedOut/InputUserInfo3";
import Main from "../routes/loggedIn/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const LogoutNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InputUserInfo1"
        component={InputUserInfo1}
        options={{
          headerBackTitle: "뒤로",
          headerTitle: "간편정보입력(1/3)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="InputUserInfo2"
        component={InputUserInfo2}
        options={{
          headerBackTitle: "뒤로",
          headerTitle: "간편정보입력(2/3)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="InputUserInfo3"
        component={InputUserInfo3}
        options={{
          headerBackTitle: "뒤로",
          headerTitle: "간편정보입력(3/3)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: "요양플랫폼",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LogoutNavi;
