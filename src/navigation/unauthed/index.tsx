import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import type { UnauthedNavParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthedNavParamList>();

const UnauthedNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default UnauthedNavigator;
