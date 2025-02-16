import { View, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  colorVariations: string[];
  onColorPicked: (color: string) => void;
};

export default function ColorPicker({ colorVariations, onColorPicked }: Props) {
  return (
    <View style={styles.colorPickerContainer}>
      <View style={styles.colorPickerIcon}>
        <AntDesign name="caretup" size={14} />
      </View>

      <View style={styles.colorPickerItems}>
        {colorVariations.map((color, index) => {
          return (
            <Pressable key={index} onPress={() => onColorPicked(color)}>
              <View
                style={[styles.colorPickerItem, { backgroundColor: color }]}
              ></View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorPickerContainer: {
    zIndex: 10,
    position: "absolute",
    top: 34,
    alignSelf: "center",
    width: 120,
    height: 80,
    borderRadius: 10,
    backgroundColor: "black",
    justifyContent: "center",
  },
  colorPickerIcon: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
  },
  colorPickerItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  colorPickerItem: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
});
