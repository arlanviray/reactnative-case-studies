import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { setItem, getItem } from "@/helpers/AsyncStorage";
import DATA, { AsyncStorageKey } from "@/data/dataWordScramble";

const colorRed = "#FF0100";
const colorBlue = "#155CA3";
const colorLightBlue = "#E4EFFF";
const colorGreen = "#3FA128";

export default function index() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const timeLimit = 60;
  const [scrambleWord, setScrambleWord] = useState<string>("");
  const [dataValue, setDataValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [countdownTimer, setCountdownTimer] = useState<number>(timeLimit);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [scores, setScores] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasBestScores, setHasBestScores] = useState<boolean>(false);
  const [bestScoresValue, setBestScoresValue] = useState<number>(0);

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

  const setAlertMessage = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert(message, "", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const newGame = () => {
    getRandomData();
    setInputValue("");
    setCountdownTimer(timeLimit);
    setShowHint(false);
    setMessage("");
    setScores(0);
    setGameOver(false);
    setHasBestScores(false);
  };

  const onReshuffle = () => {
    setScrambleWord(scrambleWordLetters(dataValue.word));
  };

  const onCheckAnswer = () => {
    if (inputValue === "") {
      setMessage("Field cannot be empty.");
    } else {
      if (dataValue.word === inputValue.toLocaleLowerCase().trim()) {
        getRandomData();
        setInputValue("");
        setShowHint(false);
        setScores((prevState) => prevState + 1);
        setMessage("Correct!");
      } else {
        setMessage("Incorrect!");
      }
    }
  };

  // init game
  // always restart the game when navigating from one drawer to another
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Init WordScramble");
      newGame();
    });
    // return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // get value from storage
  useEffect(() => {
    const getItemFromStorage = async () => {
      const storageValue = await getItem(AsyncStorageKey);
      setBestScoresValue(storageValue);
    };
    getItemFromStorage();
  }, [hasBestScores]);

  // timer countdown
  // game end
  // storing best scores into storage
  useEffect(() => {
    if (!isFocused) return; // stop once is not focus

    if (countdownTimer === 0) {
      setGameOver(true);

      const setItemToStorage = async () => {
        const hasBestScores = await getItem(AsyncStorageKey);
        if (scores > hasBestScores) {
          if (hasBestScores > 0) {
            // only set if storage value is exist and greater than zero
            setHasBestScores(true);
          }
          await setItem(AsyncStorageKey, scores);
        }
      };
      setItemToStorage();
    } else {
      const interval = setInterval(() => {
        setCountdownTimer((prevState) => prevState - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdownTimer]);

  // remove message in 2 seconds if show
  useEffect(() => {
    setInputValue("");
    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [message]);

  // console.log(dataValue);

  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleTextSmall}>SCORES</Text>
          <Text style={styles.circleText}>{scores}</Text>
        </View>
        <View
          style={[
            styles.circle,
            {
              borderColor:
                countdownTimer > 10
                  ? "rgba(63, 161, 40, 1)"
                  : "rgba(255, 0, 0, 0.2)",
              backgroundColor:
                countdownTimer > 10
                  ? "rgba(63, 161, 40, 0.2)"
                  : "rgba(255, 0, 0, 0.2)",
            },
          ]}
        >
          <Text style={[styles.circleTextSmall, { fontWeight: "700" }]}>
            TIMER
          </Text>
          <Text style={styles.circleText}>
            {countdownTimer < 10 ? `0${countdownTimer}` : countdownTimer}
          </Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleTextSmall}>YOUR BEST</Text>
          <Text style={styles.circleText}>{bestScoresValue}</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <Text
          style={[
            styles.fontLarge,
            styles.center,
            { fontSize: scrambleWord.length > 9 ? 22 : 34 },
          ]}
        >
          {scrambleWord}
        </Text>

        {gameOver ? (
          <View style={styles.gameOver}>
            <Text style={[styles.center, styles.gameOverHeader]}>
              Game Over!!!
            </Text>
            <Text style={[styles.center, styles.gameOverText]}>
              The correct word is{" "}
              <Text style={styles.gameOverTextChild}>
                {dataValue.word.toUpperCase()}
              </Text>
            </Text>
            <Pressable onPress={newGame} style={styles.button}>
              <Text
                style={[styles.center, styles.buttonText, styles.buttonSmall]}
              >
                Play again?
              </Text>
            </Pressable>
            {hasBestScores && (
              <View style={{ marginTop: 30 }}>
                <FontAwesome5
                  name="award"
                  size={50}
                  color="black"
                  style={{ marginHorizontal: "auto" }}
                />
                <Text style={[styles.center, styles.gameOverBestScores]}>
                  You have new best scores.
                </Text>
              </View>
            )}
          </View>
        ) : (
          <>
            <View style={styles.hint}>
              {showHint ? (
                <Text style={[styles.center, styles.hintText]}>
                  {dataValue.hint}
                </Text>
              ) : (
                <Pressable
                  onPress={() => setShowHint(true)}
                  style={styles.button}
                >
                  <Text
                    style={[
                      styles.center,
                      styles.buttonText,
                      styles.buttonSmall,
                    ]}
                  >
                    Take a hint?
                  </Text>
                </Pressable>
              )}
            </View>

            <TextInput
              value={inputValue}
              onChangeText={(inputText) => setInputValue(inputText)}
              onSubmitEditing={onCheckAnswer}
              autoCapitalize="characters"
              autoComplete="off"
              autoCorrect={false}
              clearTextOnFocus={true}
              enterKeyHint="done"
              inputMode="text"
              style={[styles.fontLarge, styles.center, styles.input]}
            />

            <View style={styles.buttonContainer}>
              <Pressable onPress={onReshuffle} style={styles.button}>
                <Text style={[styles.center, styles.buttonText]}>
                  Reshuffle
                </Text>
              </Pressable>

              <Pressable onPress={onCheckAnswer} style={styles.button}>
                <Text style={[styles.center, styles.buttonText]}>
                  Check Answer
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.center, styles.message]}>
              {message && message}
            </Text>
          </>
        )}
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
  circlesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 108,
    height: 108,
    backgroundColor: colorLightBlue,
    borderColor: colorBlue,
    borderWidth: 5,
    borderRadius: "50%",
  },
  circleTextSmall: {
    fontSize: 10,
    marginTop: 4,
  },
  circleText: {
    fontSize: 30,
  },

  boxContainer: {
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
    marginTop: 14,
    marginBottom: 20,
  },
  hintText: {
    color: colorGreen,
  },
  input: {
    width: "100%",
    backgroundColor: colorLightBlue,
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
    backgroundColor: colorBlue,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonSmall: {
    fontSize: 12,
    backgroundColor: colorGreen,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  message: {
    color: colorRed,
    height: 40,
    paddingTop: 20,
  },

  gameOver: {
    marginTop: 20,
  },
  gameOverHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: colorGreen,
  },
  gameOverText: {
    marginVertical: 10,
  },
  gameOverTextChild: {
    fontWeight: "500",
    color: colorGreen,
  },
  gameOverBestScores: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 6,
  },
});
