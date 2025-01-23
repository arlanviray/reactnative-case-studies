import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonsData } from "@/data/pokemons";

export default function Index() {
  const renderItem = ({ item }: any) => {
    return (
      <Pressable style={styles.button}>
        <Image source={item.variations[0].image} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.variations[0].name}</Text>
          <Text style={styles.specie}>{item.variations[0].specie}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={PokemonsData}
      keyExtractor={(item) => item.num.toString()}
      renderItem={renderItem}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  image: {
    resizeMode: "stretch",
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  specie: {
    fontSize: 12,
    color: "white",
    marginTop: 3,
  },
});
