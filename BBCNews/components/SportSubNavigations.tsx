import { StyleSheet, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";

const navigations = [
  "Home",
  "Athletics",
  "Boxing",
  "Football",
  "Rugby",
  "Swimming",
  "Tennis",
];

export default function SportSubNavigations() {
  const pathname = usePathname();
  const currPage = pathname.split("/")[2];

  return (
    <View style={styles.container}>
      {navigations.map((page, index) => {
        const url: any =
          index > 0
            ? `/sport/${navigations[index].toLocaleLowerCase()}`
            : "/sport";
        const activeStyle =
          currPage === page.toLocaleLowerCase() ||
          (currPage === undefined && index === 0)
            ? { color: "white", backgroundColor: "black" }
            : {};

        return (
          <Link href={url} key={index} style={[styles.button, activeStyle]}>
            <Text>{page}</Text>
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
    padding: 10,
    backgroundColor: "#FFD230",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
