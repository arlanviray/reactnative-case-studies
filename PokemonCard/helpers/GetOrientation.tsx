import { useEffect, useState } from "react";
import { Dimensions, StatusBar, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export const getOrientation = () => {
  const [orientation, setOrientation] = useState(
    width < height ? "PORTRAIT" : "LANDSCAPE"
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window: { width, height }, screen }) => {
        if (width < height) {
          setOrientation("PORTRAIT");
        } else {
          setOrientation("LANDSCAPE");
        }
      }
    );

    return () => subscription?.remove();
  }, []);

  return orientation;
};

export const getLandscapeMessage = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
          App only available on Portrait mode.
        </Text>
      </View>
    </>
  );
};
