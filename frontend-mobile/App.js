import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StatusBar } from "react-native";

import LogoutNavi from "./navigate/LogoutNavi";
import LoginNavi from "./navigate/LoginNavi";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar barStyle={"default"} />
      {isLogin ? <LoginNavi /> : <LogoutNavi />}
    </NavigationContainer>
  );
}
