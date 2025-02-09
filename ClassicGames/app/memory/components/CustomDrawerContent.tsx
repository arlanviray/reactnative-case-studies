import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { router, useSegments } from "expo-router";

export default function CustomDrawerContent(props: any) {
  const [urlParent, urlChild] = useSegments();

  const drawerItems = [
    {
      label: "Hangman",
      url: "hangman",
    },
    {
      label: "Memory Game",
      url: "memory",
    },
    {
      label: "Word Scramble",
      url: "wordscramble",
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {drawerItems.map(({ label, url }: { label: string; url: any }, index) => (
        <DrawerItem
          key={index}
          label={label}
          focused={urlParent === url ? true : false}
          activeBackgroundColor="#E4EFFF"
          onPress={() => router.push(url)}
        />
      ))}
    </DrawerContentScrollView>
  );
}
