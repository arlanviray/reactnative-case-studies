import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
  item: any;
  selectedCards: (id: number) => void;
  toggled: boolean;
  stopFlip: boolean;
  tiles: number;
};

export default function Card({
  item,
  selectedCards,
  toggled,
  stopFlip,
  tiles,
}: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toggled ? withSpring(0) : withSpring(1),
    };
  });

  const squareSize = tiles > 14 ? 62 : 72;

  return (
    <Pressable onPress={() => !stopFlip && selectedCards(item)}>
      <View style={{ borderWidth: 1, width: squareSize, height: squareSize }}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.bgImage}
        />
        <Animated.View style={[styles.icon, animatedStyle]}>
          <FontAwesome5 name="question" size={24} color="#808080" />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
