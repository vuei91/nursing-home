import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../routes/loggedIn/Home";
import HealthCare from "../routes/loggedIn/HealthCare";
import RegisterHistory from "../routes/loggedIn/RegisterHistory";
import MyPage from "../routes/loggedIn/MyPage";
import {
  Foundation,
  AntDesign,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const BottomNavi = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={size} color={color} />
          ),
          title: "홈",
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="HealthCare"
        component={HealthCare}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquareo" size={size} color={color} />
          ),
          title: "건강관리",
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="RegisterHistory"
        component={RegisterHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="list-alt" size={size} color={color} />
          ),
          title: "신청내역",
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
          title: "마이페이지",
          tabBarActiveTintColor: "black",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavi;
