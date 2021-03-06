import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Signup,
  LandingPage,
  MobileOTP,
  OTPScreen,
} from "../Screens";
import navigationStrings from "../constants/navigationStrings";
import TabRoutes from "./TabRoutes";
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.LANDING_PAGE}
        component={LandingPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.SIGNUP}
        component={Signup}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.MOBILEOTP}
        component={MobileOTP}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.OTP_SCREEN}
        component={OTPScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigationStrings.TAB_ROUTES}
        component={TabRoutes}
      />
    </React.Fragment>
  );
}

export default AuthStack;
