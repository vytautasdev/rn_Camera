import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {RNCamera} from "react-native-camera";
import {useCamera} from "react-native-camera-hooks";
import CustomButton from "./CustomButton";
import RNFS from "react-native-fs";

const Camera = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandler = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = `${RNFS.ExternalDirectoryPath}/MyTest.jpg`;
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log("IMAGE MOVED", filePath, "-- to --", newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        style={styles.cameraPreview}
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}>
        <CustomButton
          title="Capture"
          color="#1eb900"
          onPressFunction={() => captureHandler()}
        />
      </RNCamera>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  cameraPreview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
