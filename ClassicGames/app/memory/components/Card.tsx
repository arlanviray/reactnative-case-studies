import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
  item: any;
  selectedCards: (id: number) => void;
  toggled: boolean;
  stopFlip: boolean;
};

export default function Card({
  item,
  selectedCards,
  toggled,
  stopFlip,
}: Props) {
  return (
    <Pressable onPress={() => !stopFlip && selectedCards(item)}>
      <View style={styles.container}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.bgImage}
        />
        <View style={[styles.icon, { opacity: toggled ? 0 : 1 }]}>
          <FontAwesome5 name="question" size={24} color="#808080" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    borderWidth: 1,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  icon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});
