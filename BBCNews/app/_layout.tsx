import { StatusBar, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
});
