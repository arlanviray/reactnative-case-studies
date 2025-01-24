import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Icons } from "@/data/icons";

type Props = {
  types: [];
};

export default function PokemonIcons({ types }: Props) {
  return (
    <>
      {/* Render Error - on using Modal with SafeArea */}
      {/* ScrollView child layout (["alignItems"]) must be applied through the contentContainerStyle prop. */}
      {/* <FlatList
        style={styles.container}
        data={types}
        renderItem={({ item }: { item: string }) => (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: Icons[item.toLocaleLowerCase()].color },
            ]}
          >
            <Image
              source={Icons[item.toLocaleLowerCase()].icon}
              style={styles.iconImage}
            />
            <Text style={styles.iconText}>{item}</Text>
          </View>
        )}
      /> */}

      <View style={styles.container}>
        {types.map((item: string, index: number) => (
          <View
            key={index}
            style={[
              styles.iconContainer,
              { backgroundColor: Icons[item.toLocaleLowerCase()].color },
            ]}
          >
            <Image
              source={Icons[item.toLocaleLowerCase()].icon}
              style={styles.iconImage}
            />
            <Text style={styles.iconText}>{item}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 6,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingRight: 10,
    paddingLeft: 4,
  },
  iconImage: {
    width: 26,
    height: 26,
  },
  iconText: {
    fontSize: 12,
    color: "white",
  },
});
