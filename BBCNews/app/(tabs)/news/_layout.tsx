import { Stack } from "expo-router";
import NewsSubNavigations from "@/components/NewsSubNavigations";

export default function SportLayout() {
  return (
    <>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="uk" options={{ headerShown: false }} />
        <Stack.Screen name="africa" options={{ headerShown: false }} />
        <Stack.Screen name="asia" options={{ headerShown: false }} />
        <Stack.Screen name="australia" options={{ headerShown: false }} />
        <Stack.Screen name="europe" options={{ headerShown: false }} />
        <Stack.Screen name="latin-america" options={{ headerShown: false }} />
        <Stack.Screen name="middle-east" options={{ headerShown: false }} />
        <Stack.Screen name="us-and-canada" options={{ headerShown: false }} />
      </Stack>
      {/* <NewsSubNavigations /> */}
    </>
  );
}
