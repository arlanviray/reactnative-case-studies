import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import PokemonIcons from "@/components/PokemonIcons";

type Props = {
  item: any;
  showModal: (index: number) => void;
};

export default function PokemonButton({ item, showModal }: Props) {
  const { image, name, types } = item.variations[0];

  return (
    <Pressable onPress={() => showModal(item.num)} style={styles.button}>
      <Image source={image} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <PokemonIcons types={types} />
      </View>
      <View style={styles.arrow}>
        <Feather name="arrow-right-circle" color="#fff" size={30} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#0081F1",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "stretch",
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  arrow: {
    marginLeft: "auto",
  },
});
