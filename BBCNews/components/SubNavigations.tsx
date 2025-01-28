import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Link,
  router,
  useFocusEffect,
  useNavigation,
  useSegments,
} from "expo-router";

type Props = {
  navigations: string[];
  bgcolor: string;
  urlId: number;
  onPress: (id: number) => void;
};

export default function SubNavigations({
  navigations,
  bgcolor,
  urlId,
  onPress,
}: Props) {
  const navigation = useNavigation();
  const [first, urlParent, urlChild] = useSegments();

  const urlParentTitle = `BBC ${urlParent
    ?.charAt(0)
    .toLocaleUpperCase()}${urlParent?.slice(1)}`;

  const urlChildTitle =
    urlChild !== undefined ? ` - ${navigations[urlId]}` : "";

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: `${urlParentTitle}${urlChildTitle}`,
    });
  });

  // console.log(urlParent, urlChild, "urlId:", urlId);

  return (
    <View style={[styles.container, { backgroundColor: bgcolor }]}>
      {navigations.map((page, index) => {
        const urlChildValue = page
          .replaceAll(" ", "-")
          .replace("&", "and")
          .toLocaleLowerCase();

        const url: any =
          index === 0
            ? `/${urlParent}`
            : `/${urlParent}/${urlChildValue}?id=${index}`;

        const activeButton =
          (index === 0 && urlChild === undefined) || urlChild === urlChildValue
            ? { backgroundColor: "black" }
            : {};
        const activeText =
          (index === 0 && urlChild === undefined) || urlChild === urlChildValue
            ? { color: "white" }
            : {};

        return (
          <Pressable
            key={index}
            onPress={() => {
              router.push(url);
              onPress(index);
            }}
            style={[styles.button, activeButton]}
          >
            {/* <Link href={url} key={index} style={[styles.button, activeButton]}></Link> */}
            <Text style={[styles.text, activeText]}>{page}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
  },
});
