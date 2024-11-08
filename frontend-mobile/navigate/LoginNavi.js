import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register1 from "../routes/registration/Register1";
import Register2 from "../routes/registration/Register2";
import Register3 from "../routes/registration/Register3";
import BottomNavi from "./BottomNavi";
const Stack = createNativeStackNavigator();

const LoginNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={BottomNavi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register1"
        component={Register1}
        options={{
          headerBackTitle: "뒤로",
          headerTitle: "신청하기(1/3)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{
          headerBackTitle: "뒤로",
          headerTitle: "신청하기(2/3)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Register3"
        component={Register3}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "신청하기(3/3)",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavi;
