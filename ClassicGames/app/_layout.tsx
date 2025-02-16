import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGlobalSearchParams } from "expo-router";
import { Drawer } from "expo-router/drawer";
import dataDrawerItems from "@/data/dataDrawerItems";
import CustomDrawerContent from "../components/CustomDrawerContent";

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
              headerTitle: "Classic Games",
              headerTitleAlign: "center",
              drawerLabel: "Home",
              headerLeft: () => <></>,
            }}
          />

          {dataDrawerItems.map(
            ({ label, url }: { label: string; url: any }, index) => (
              <Drawer.Screen
                key={index}
                name={url}
                options={{
                  headerTitle: label + paramLevel,
                  drawerItemStyle: { display: "none" },
                }}
              />
            )
          )}
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
