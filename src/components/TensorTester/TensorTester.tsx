import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

const TensorTester: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [ready, setReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      console.log("Attempting to load TensorFlow!");
      setLoading(true);

      try {
        await tf.ready();
        setReady(true);
        console.log("Successfully loaded TensorFlow!");
      } catch (error) {
        console.error(error.message || error);
        Alert.alert("Error", "Failed to load TensorFlow!");
      }

      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.root}>
      <Text>TensorFlow: {loading ? "...Loading..." : String(ready)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TensorTester;
