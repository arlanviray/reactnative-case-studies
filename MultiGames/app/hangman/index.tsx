import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DATA } from "./data";
import ProgressParts from "./ProgressParts";
import Keyboard from "./Keyboard";

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

  const onClickGuess = (letter: any) => {
    if (fails.length === maxFails && status) return;

    if (word.includes(letter)) {
      setCorrects((prevState) => [...(prevState as never), letter as never]);
    } else {
      setFails((prevState) => [...(prevState as never), letter as never]);
    }
  };

  const onResetGame = () => {
    getRandomWord();
    setShowHint(false);
    setCorrects([]);
    setFails([]);
    setStatus("");
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

      <Keyboard corrects={corrects} fails={fails} onClick={onClickGuess} />
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
