import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { UnauthedNavParamList } from "../types";

type PropTypes = NativeStackScreenProps<UnauthedNavParamList, "Picker">;

const PickerScreen: React.FC<PropTypes> = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Error", "Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);
  };

  return (
    <View style={styles.root}>
      <Text>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      {selectedImage != null && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Editor", {
                image: selectedImage,
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
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
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default PickerScreen;
