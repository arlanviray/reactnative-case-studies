import { StyleSheet, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";

type Props = {
  navigations: string[];
  bgcolor: string;
};

export default function SubNavigations({ navigations, bgcolor }: Props) {
  const pathname = usePathname();
  const urlParent = pathname.split("/")[1];
  const urlChild = pathname.split("/")[2];

  return (
    <View style={[styles.container, { backgroundColor: bgcolor }]}>
      {navigations.map((page, index) => {
        const urlChildValue = page
          .replaceAll(" ", "-")
          .replace("&", "and")
          .toLocaleLowerCase();

        const url: any =
          index > 0 ? `/${urlParent}/${urlChildValue}` : `/${urlParent}`;

        const activeStyle =
          urlChild === urlChildValue || (urlChild === undefined && index === 0)
            ? { color: "white", backgroundColor: "black" }
            : {};

        return (
          <Link href={url} key={index} style={[styles.button, activeStyle]}>
            <Text style={styles.text}>{page}</Text>
          </Link>
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
    paddingVertical: 4,
  },
  text: {
    fontSize: 11,
  },
});
