import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DATA } from "./data";
import ProgressParts from "./ProgressParts";

export default function index() {
  const [word, setWord] = useState<string>("");
  const [corrects, setCorrects] = useState<{ value: string }[]>([]);
  const [fails, setFails] = useState<{ value: string }[]>([]);
  const [status, setStatus] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const maxFails = 6;

  const getRandomWord = () => {
    const randIndex = Math.floor(Math.random() * DATA.length);
    setWord(DATA[randIndex].word.toUpperCase());
    setHint(DATA[randIndex].hint);
  };

  const onResetGame = () => {
    getRandomWord();
  };

  useEffect(() => {
    onResetGame();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressParts fails={fails} />

      <View style={styles.wordContainer}>
        {word.split("").map((letter, index) => {
          const failed =
            fails.length === maxFails ? (
              <Text style={styles.failedLetters}>{letter}</Text>
            ) : (
              "_"
            );

          return (
            <Text key={index} style={styles.wordLetters}>
              {corrects.includes(letter as never) ? letter : failed}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  wordContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  wordLetters: {
    fontSize: 26,
    fontWeight: "700",
  },
  failedLetters: {
    color: "#E0E0E0",
  },
});
