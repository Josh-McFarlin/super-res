import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { Rank, Tensor } from "@tensorflow/tfjs";
import { loadModel } from "../../../utils/tensorflow/esrgan";
import { encodeJpeg } from "../../../utils/tensorflow/image";
import type { UnauthedNavParamList } from "../types";

type PropTypes = NativeStackScreenProps<UnauthedNavParamList, "Editor">;

const EditorScreen: React.FC<PropTypes> = ({ route }) => {
  const [processedImage, setProcessed] = React.useState<string | null>(null);

  const handleProcess = async () => {
    const model = await loadModel();

    console.log("model", model);

    // Get a reference to the bundled asset and convert it to a tensor
    const response = await fetch(route.params.image, {}, { isBinary: true });
    const imageDataBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataBuffer);

    const imageTensor = decodeJpeg(imageData);

    let lowResImage = tf.expandDims(imageTensor, 0);
    lowResImage = tf.cast(lowResImage, "float32");
    // const superResImage = await model.execute(lowResImage, []);
    const superResImage = (await model.predict(lowResImage)) as Tensor<Rank>;

    const res = tf.cast(tf.clipByValue(superResImage, 0, 255), "int32");
    console.log("res", res);

    const img = await encodeJpeg(res);
    setProcessed(img.uri);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={{ uri: route.params.image }} style={styles.thumbnail} />

        <TouchableOpacity onPress={handleProcess} style={styles.button}>
          <Text style={styles.buttonText}>Process Photo</Text>
        </TouchableOpacity>

        {processedImage !== null && (
          <>
            <Text>Processed</Text>
            <Image source={{ uri: processedImage }} style={styles.thumbnail} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

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
  thumbnail: {
    width: 500,
    maxWidth: "80%",
    height: 400,
    resizeMode: "contain",
  },
});

export default EditorScreen;
