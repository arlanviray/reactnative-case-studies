import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  corrects: any;
  fails: any;
  onClick: (letter: string) => void;
};

export default function Keyboard({ corrects, fails, onClick }: Props) {
  return (
    <View style={styles.container}>
      {Array.from(Array(26)).map((_, index) => {
        const letter = String.fromCharCode(65 + index);
        const inactive = corrects.includes(letter) || fails.includes(letter);

        return (
          <Pressable
            key={index}
            disabled={inactive}
            onPress={() => onClick(letter)}
          >
            <Text style={[styles.letter, inactive ? styles.inactive : ""]}>
              {letter}
            </Text>
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
    gap: 8,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  letter: {
    width: 40,
    textAlign: "center",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 6,
  },
  inactive: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    backgroundColor: "#E0E0E0",
  },
});
