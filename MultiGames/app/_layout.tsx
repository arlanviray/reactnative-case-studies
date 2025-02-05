import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <GestureHandlerRootView>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
              // drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="hangman"
            options={{
              drawerLabel: "Hangman",
              title: "Hangman",
            }}
          />
          <Drawer.Screen
            name="memory"
            options={{
              drawerLabel: "Memory Game",
              title: "Memory Game",
            }}
          />
          <Drawer.Screen
            name="wordscramble"
            options={{
              drawerLabel: "Word Scramble",
              title: "Word Scramble",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
