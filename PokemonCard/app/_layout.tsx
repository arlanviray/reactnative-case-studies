import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { getOrientation, getLandscapeMessage } from "@/helpers/GetOrientation";

export default function RootLayout() {
  return (
    <>
      {getOrientation() === "PORTRAIT" ? (
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar barStyle={"dark-content"} />
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: "Popular Pokémon",
                  headerTitleAlign: "center",
                  headerShown: true,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
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
