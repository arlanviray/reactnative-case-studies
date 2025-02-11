import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { setItem, getItem } from "@/helpers/AsyncStorage";
import DATA from "./data";

export default function index() {
  const timeLimit = 60;
  const [scrambleWord, setScrambleWord] = useState<string>("");
  const [dataValue, setDataValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [timeCountdown, setTimeCountdown] = useState<number>(timeLimit);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<boolean>(false);

  const scrambleWordLetters = (word: string) => {
    const characters = word.split("");
    characters.sort(() => 0.5 - Math.random());
    const results = characters.join("");
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
    setShowHint(false);
  };

  const onReshuffle = () => {
    setScrambleWord(scrambleWordLetters(dataValue.word));
  };

  // initiate game
  useEffect(() => {
    newGame();
  }, []);

  // timer countdown
  useEffect(() => {
    if (timeCountdown === 0) {
      //
    } else {
      const interval = setInterval(() => {
        setTimeCountdown((prevState) => prevState - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeCountdown]);

  // console.log(dataValue);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.countdown,
          {
            borderColor:
              timeCountdown > 10
                ? "rgba(63, 161, 40, 1)"
                : "rgba(255, 0, 0, 0.2)",
            backgroundColor:
              timeCountdown > 10
                ? "rgba(63, 161, 40, 0.2)"
                : "rgba(255, 0, 0, 0.2)",
          },
        ]}
      >
        <Text style={{ fontSize: 10, marginTop: 4 }}>TIMER</Text>
        <Text style={styles.countdownText}>
          {timeCountdown < 10 ? `0${timeCountdown}` : timeCountdown}
        </Text>
      </View>

      <View style={styles.wrapper}>
        <Text
          style={[
            styles.fontLarge,
            styles.center,
            { fontSize: scrambleWord.length > 9 ? 22 : 34 },
          ]}
        >
          {scrambleWord}
        </Text>

        <View style={styles.hint}>
          {showHint ? (
            <Text style={[styles.center, styles.hintText]}>
              {dataValue.hint}
            </Text>
          ) : (
            <Pressable onPress={() => setShowHint(true)} style={styles.button}>
              <Text
                style={[styles.center, styles.buttonText, styles.hintButton]}
              >
                Take a hint?
              </Text>
            </Pressable>
          )}
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
          <Pressable onPress={onReshuffle} style={styles.button}>
            <Text style={[styles.center, styles.buttonText]}>Reshuffle</Text>
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
  countdown: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderWidth: 4,
    borderRadius: "50%",
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 26,
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
    letterSpacing: 4,
  },
  center: {
    textAlign: "center",
  },
  hint: {
    marginVertical: 14,
  },
  hintText: {
    color: "#3FA128",
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
