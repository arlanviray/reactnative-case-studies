import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import DATA from "@/data/dataHangman";
import ProgressParts from "./components/ProgressParts";
import Keyboard from "./components/Keyboard";
import ModalHint from "./components/ModalHint";

export default function index() {
  const navigation = useNavigation();

  const [word, setWord] = useState<string>("");
  const [corrects, setCorrects] = useState<{ value: string }[]>([]);
  const [fails, setFails] = useState<{ value: string }[]>([]);
  const [status, setStatus] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [modalHintVisible, setModalHintVisible] = useState<boolean>(false);
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

  const newGame = () => {
    getRandomWord();
    setCorrects([]);
    setFails([]);
    setStatus("");
  };

  // init game
  // always restart the game when navigating from one drawer to another
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Init Hangman");
      newGame();
    });
    // return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // set corrects
  useEffect(() => {
    if (
      corrects.length &&
      word.split("").every((letter) => corrects.includes(letter as never))
    ) {
      setStatus("won");
    }
  }, [corrects]);

  // set fails
  useEffect(() => {
    if (fails.length === maxFails) {
      setStatus("lose");
    }
  }, [fails]);

  const onModalHintShow = () => {
    setModalHintVisible(true);
  };

  const onModalHintClose = () => {
    setModalHintVisible(false);
  };

  // console.log("Word:", word, "Corrects:", corrects);
  // console.log("Fails:", fails, "Status:", status);

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

      {status ? (
        <View>
          <View style={styles.gameEnd}>
            {status === "won" ? (
              <>
                <Text style={[styles.gameEndText, { color: "#54b754" }]}>
                  You won!
                </Text>
                <Entypo
                  name="emoji-happy"
                  size={40}
                  color="#54b754"
                  style={styles.gameEndIcon}
                />
              </>
            ) : (
              <>
                <Text style={[styles.gameEndText, { color: "#2a3b90" }]}>
                  You failed!
                </Text>
                <Entypo
                  name="emoji-sad"
                  size={40}
                  color="#2a3b90"
                  style={styles.gameEndIcon}
                />
              </>
            )}
          </View>
          <Pressable onPress={newGame} style={styles.button}>
            <Text style={styles.buttonText}>Play again?</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {fails.length > 3 && (
            <Pressable onPress={onModalHintShow} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  { backgroundColor: "#A9A9A9", marginBottom: 20 },
                ]}
              >
                Take a hint?
              </Text>
            </Pressable>
          )}

          <Keyboard corrects={corrects} fails={fails} onClick={onClickGuess} />

          <ModalHint isVisible={modalHintVisible} closeModal={onModalHintClose}>
            {hint}
          </ModalHint>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    maxWidth: 500,
    marginHorizontal: "auto",
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
  gameEnd: {
    marginHorizontal: 20,
  },
  gameEndText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  gameEndIcon: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
