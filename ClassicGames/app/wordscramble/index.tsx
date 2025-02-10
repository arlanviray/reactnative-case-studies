import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { setItem, getItem } from "@/helpers/AsyncStorage";
import DATA from "./data";

export default function index() {
  const timeLimit = 60;
  const [scrambleWord, setScrambleWord] = useState<string>("");
  const [dataValue, setDataValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [newRecord, setNewRecord] = useState<boolean>(false);

  const scrambleWordLetters = (word: string) => {
    const characters = word.split("");
    characters.sort(() => 0.5 - Math.random());
    const results = characters.join(" ");
    return results;
  };

  const getRandomData = () => {
    const randIndex = Math.floor(Math.random() * DATA.length);
    const randData = DATA[randIndex];
    setScrambleWord(scrambleWordLetters(randData.word));
    setDataValue(randData);
  };

  const newGame = () => {
    getRandomData();
  };

  useEffect(() => {
    newGame();
  }, []);

  console.log();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text
          style={[
            styles.fontLarge,
            styles.center,
            { fontSize: String(dataValue.word).length > 8 ? 22 : 34 },
          ]}
        >
          {scrambleWord}
        </Text>

        <View style={styles.hint}>
          <Pressable style={styles.button}>
            <Text style={[styles.center, styles.buttonText, styles.hintButton]}>
              Take a hint?
            </Text>
          </Pressable>
        </View>

        <TextInput
          defaultValue={inputValue}
          onChangeText={(inputText) => setInputValue(inputText)}
          autoCorrect={false}
          enterKeyHint="done"
          inputMode="text"
          style={[styles.fontLarge, styles.center, styles.input]}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={[styles.center, styles.buttonText]}>Refresh Word</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={[styles.center, styles.buttonText]}>Check Answer</Text>
          </Pressable>
        </View>
        <Text>Text: {inputValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  wrapper: {
    width: 350,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  fontLarge: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  center: {
    textAlign: "center",
  },
  hint: {
    marginVertical: 14,
  },
  hintButton: {
    fontSize: 12,
    backgroundColor: "#3FA128",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#E4EFFF",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    borderRadius: 8,
    backgroundColor: "#155CA3",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
