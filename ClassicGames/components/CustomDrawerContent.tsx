import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { router, useSegments } from "expo-router";
import dataDrawerItems from "@/data/dataDrawerItems";

export default function CustomDrawerContent(props: any) {
  const [urlParent, urlChild] = useSegments();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {dataDrawerItems.map(
        ({ label, url }: { label: string; url: any }, index) => (
          <DrawerItem
            key={index}
            label={label}
            focused={urlParent === url ? true : false}
            activeBackgroundColor="#E4EFFF"
            onPress={() => router.push(url)}
          />
        )
      )}
    </DrawerContentScrollView>
  );
}
