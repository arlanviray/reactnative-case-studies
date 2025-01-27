import { Stack } from "expo-router";
import SportSubNavigations from "@/components/SportSubNavigations";

export default function SportLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="athletics" options={{ headerShown: false }} />
        <Stack.Screen name="boxing" options={{ headerShown: false }} />
        <Stack.Screen name="football" options={{ headerShown: false }} />
        <Stack.Screen name="rugby" options={{ headerShown: false }} />
        <Stack.Screen name="swimming" options={{ headerShown: false }} />
        <Stack.Screen name="tennis" options={{ headerShown: false }} />
      </Stack>
      <SportSubNavigations />
    </>
  );
}
