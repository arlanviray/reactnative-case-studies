import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGlobalSearchParams } from "expo-router";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "./memory/components/CustomDrawerContent";

export default function RootLayout() {
  const urlParam = useGlobalSearchParams();
  const paramLevel = urlParam.level
    ? `: ${String(urlParam.level).charAt(0).toLocaleUpperCase()}${String(
        urlParam.level.slice(1)
      )}`
    : "";

  // console.log(urlParam, paramLevel);

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            drawerActiveBackgroundColor: "#E4EFFF",
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="index"
            options={{
              headerTitle: "",
              drawerLabel: "Home",
            }}
          />
          <Drawer.Screen
            name="hangman"
            options={{
              headerTitle: "Hangman",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="memory"
            options={{
              headerTitle: `Memory Game ${paramLevel}`,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="wordscramble"
            options={{
              headerTitle: "Word Scramble",
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
