import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import PickerScreen from "./screens/Picker";
import EditorScreen from "./screens/Editor";
import type { UnauthedNavParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthedNavParamList>();

const UnauthedNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Picker" component={PickerScreen} />
    <Stack.Screen name="Editor" component={EditorScreen} />
  </Stack.Navigator>
);

export default UnauthedNavigator;
