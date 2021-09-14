import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import TensorTester from "../../../components/TensorTester/TensorTester";
import type { UnauthedNavParamList } from "../types";

type PropTypes = NativeStackScreenProps<UnauthedNavParamList, "Home">;

const HomeScreen: React.FC<PropTypes> = ({ navigation }) => (
  <View style={styles.root}>
    <Text>Home Screen</Text>
    <TensorTester />
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Picker")}
    >
      <Text>Get Started</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    marginTop: 8,
  },
  buttonText: {
    fontWeight: "normal",
  },
});

export default HomeScreen;
