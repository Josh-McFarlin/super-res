import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import TensorTester from "../../../components/TensorTester/TensorTester";
import type { UnauthedNavParamList } from "../types";

type PropTypes = NativeStackScreenProps<UnauthedNavParamList, "Home">;

const HomeScreen: React.FC<PropTypes> = ({ navigation }) => {
  const [email, setEmail] = React.useState<string>("");

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <TensorTester />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default HomeScreen;
