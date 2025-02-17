import { StatusBar, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { getOrientation, getLandscapeMessage } from "@/helpers/GetOrientation";

export default function RootLayout() {
  return (
    <>
      {getOrientation() === "PORTRAIT" ? (
        <>
          <StatusBar barStyle={"light-content"} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </>
      ) : (
        getLandscapeMessage()
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
});
