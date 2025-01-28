import { Stack } from "expo-router";

type Props = {
  navigations: string[];
};

export default function SubStackScreen({ navigations }: Props) {
  return (
    <Stack>
      {navigations.map((navigation, index) => {
        const navValue = navigation
          .replaceAll(" ", "-")
          .replace("&", "and")
          .toLocaleLowerCase();

        return (
          <Stack.Screen
            name={navValue === "home" ? "index" : navValue}
            options={{ headerShown: false, headerLeft: () => <></> }}
            key={index}
          />
        );
      })}
    </Stack>
  );
}
