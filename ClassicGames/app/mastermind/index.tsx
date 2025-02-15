import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ModalRules from "./components/ModalRules";

const colorVariations = ["red", "blue", "green", "yellow", "purple", "pink"];
const colorGray = "#A0A1A0";
const colorLightGray = "#DCDCDC";

export default function index() {
  const maxPins = 4;
  const maxGames = 10;
  const colorCorrectPos = "black";
  const colorWrongPos = "white";
  const [codeMaker, setCodeMaker] = useState<string[]>([]); // computer
  const [codeBreaker, setCodeBreaker] = useState<any[]>([]); // human
  const [rowGuessId, setRowGuessId] = useState<number>(0);
  const [colGuessId, setColGuessId] = useState<number | null>(null);
  const [checkGuess, setCheckGuess] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [statusWon, setStatusWon] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const colorBoxPicker = () => {
    return (
      <View style={styles.colorBoxContainer}>
        <View style={styles.colorBoxIcon}>
          <AntDesign name="caretup" size={14} />
        </View>

        <View style={styles.colorBoxItems}>
          {colorVariations.map((color, index) => {
            return (
              <Pressable key={index} onPress={() => onColorPicked(color)}>
                <View
                  style={[styles.colorBoxItem, { backgroundColor: color }]}
                ></View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  const onColorPicked = (color: string) => {
    // console.log(color);
    setCodeBreaker((prevState) =>
      prevState.map((rowItem: any, rowIndex: any) =>
        rowIndex === rowGuessId
          ? {
              ...rowItem,
              guesses: rowItem.guesses.map((arrVal: any, colIndex: number) =>
                colIndex === colGuessId ? color : arrVal
              ),
            }
          : rowItem
      )
    );

    setShowColorPicker(false);
  };

  const onClickCheck = () => {
    const codeMakerCopy = [...codeMaker];
    const codeBreakerGuessesCopy = [...codeBreaker[rowGuessId].guesses];
    const feedback: string[] = [];
    const remArrayFromIndex: number[] = [];

    // feedback with black (correct color and position)
    codeMakerCopy.map((color, index) => {
      if (color === codeBreakerGuessesCopy[index]) {
        feedback.push(colorCorrectPos);
        remArrayFromIndex.push(index);
      }
    });
    // console.log("OLD Array", codeMakerCopy, codeBreakerGuessesCopy);

    // reverse to avoid removal of array (codeMakerCopy | codeBreakerGuessesCopy)
    // missing at the beginning when runs again
    remArrayFromIndex.reverse().map((remIndex) => {
      codeMakerCopy.splice(remIndex, 1);
      codeBreakerGuessesCopy.splice(remIndex, 1);
    });

    // feedback with white (correct color but not position)
    codeMakerCopy.map(
      (color, index) =>
        codeBreakerGuessesCopy.includes(color) && feedback.push(colorWrongPos)
    );

    // console.log("NEW Array", codeMakerCopy, codeBreakerGuessesCopy);
    console.log("feedback", feedback);

    // insert feedback into array object
    codeBreaker[rowGuessId].feedback = feedback;

    // possible game over
    const feedbackCorrect =
      feedback.length === maxPins && !feedback.includes(colorWrongPos);
    if (rowGuessId === maxGames || feedbackCorrect) {
      setGameOver(true);
      if (feedbackCorrect) {
        setStatusWon(true);
      }
    } else {
      setRowGuessId((prevState) => prevState + 1);
    }

    setColGuessId(null);
    setCheckGuess(false);
  };

  const setCodeMakerPattern = () => {
    const colors: string[] = [];
    // duplicate array 4 times for possibilty of having the same colors
    Array.from(Array(maxPins)).map((_, index) =>
      colors.push(...colorVariations)
    );
    // randomise value
    colors.sort(() => Math.random() - 0.5);
    // pick the first 4 items in array
    const chosenColors = colors.slice(0, maxPins);

    setCodeMaker(chosenColors);
  };

  const setCodeBreakerInitValue = () => {
    // add 4 items with null value in array of guesses
    const objVal = { guesses: Array(maxPins).fill(null), feedback: [] };

    const arrValue: any[] = [];
    Array.from(Array(maxGames)).map((_, index) => arrValue.push(objVal));

    setCodeBreaker(arrValue);
  };

  const newGame = () => {
    setCodeMakerPattern();
    setCodeBreakerInitValue();
    setRowGuessId(0);
    setColGuessId(null);
    setCheckGuess(false);
    setShowColorPicker(false);
    setGameOver(false);
    setStatusWon(false);
  };

  const onClickRules = () => {
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log("Init MemoryGame");
    newGame();
  }, []);

  // display check button
  useEffect(() => {
    // check array object if exist or not
    if (!codeBreaker[rowGuessId]) return;
    // check for null in array if not show button
    if (!codeBreaker[rowGuessId].guesses.includes(null)) setCheckGuess(true);
  }, [codeBreaker]);

  console.log("codeMaker:", codeMaker);
  console.log("codeBreaker:", codeBreaker);

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={[styles.gameRows, { borderTopWidth: 0 }]}>
          <Text style={styles.gameCounter}></Text>
          <View style={styles.guessesContainer}>
            <View style={styles.guessesWrapper}>
              {codeMaker.map((color, index) =>
                gameOver ? (
                  <View
                    key={index}
                    style={[styles.guessesPin, { backgroundColor: color }]}
                  ></View>
                ) : (
                  <View
                    key={index}
                    style={[
                      styles.guessesPin,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <FontAwesome6 name="question" size={14} color="black" />
                  </View>
                )
              )}
            </View>
          </View>
          <View style={styles.feedbackContainer}>
            <View style={styles.feedbackWrapper}></View>
            <Pressable
              onPress={onClickRules}
              style={[
                button.default,
                button.rules,
                { opacity: modalVisible ? 0 : 1 },
              ]}
            >
              <Text style={button.text}>Rules</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          {codeBreaker.map((item, itemRowIndex) => {
            const rowCounter = itemRowIndex + 1;
            const activeButton = itemRowIndex === rowGuessId ? false : true;
            const activeOpacity = {
              opacity: rowGuessId >= itemRowIndex ? 1 : 0.2,
            };
            const itemRowDone = {
              backgroundColor: rowGuessId > itemRowIndex ? "#E4EFFF" : "none",
            };

            return (
              <View style={[styles.gameRows, itemRowDone]} key={itemRowIndex}>
                <Text style={[styles.gameCounter, activeOpacity]}>
                  {rowCounter < 10 && "0"}
                  {rowCounter}
                </Text>

                <View style={styles.guessesContainer}>
                  <View style={[styles.guessesWrapper, activeOpacity]}>
                    {item.guesses.map(
                      (guessColor: string, guessColIndex: number) => (
                        <View key={guessColIndex}>
                          <Pressable
                            disabled={activeButton}
                            onPress={() => {
                              setRowGuessId(itemRowIndex);
                              setColGuessId(guessColIndex);
                              setShowColorPicker(
                                showColorPicker &&
                                  rowGuessId === itemRowIndex &&
                                  colGuessId === guessColIndex
                                  ? false
                                  : true
                              );
                            }}
                          >
                            <View
                              style={[
                                styles.guessesPin,
                                { backgroundColor: guessColor },
                              ]}
                            ></View>
                          </Pressable>

                          {showColorPicker &&
                            rowGuessId === itemRowIndex &&
                            colGuessId === guessColIndex &&
                            colorBoxPicker()}
                        </View>
                      )
                    )}
                  </View>
                </View>

                <View style={styles.feedbackContainer}>
                  <View style={styles.feedbackWrapper}>
                    {Array.from(Array(maxPins)).map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.feedbackPin,
                          item.feedback[index] && {
                            backgroundColor: item.feedback[index],
                          },
                        ]}
                      ></View>
                    ))}
                  </View>

                  {checkGuess && rowGuessId === itemRowIndex && (
                    <Pressable onPress={onClickCheck} style={button.default}>
                      <Text style={button.text}>Check</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <ModalRules isVisible={modalVisible} closeModal={onModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },

  gameContainer: {
    width: 320,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: colorGray,
    marginTop: 10,
  },

  gameRows: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: colorLightGray,
  },

  gameCounter: {
    fontSize: 11,
    width: 30,
    paddingLeft: 10,
    alignSelf: "center",
  },

  guessesContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colorLightGray,
    borderStyle: "solid",
  },
  guessesWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 10,
  },
  guessesPin: {
    width: 26,
    height: 26,
    backgroundColor: "#E4EFFF",
    borderRadius: "50%",
    borderWidth: 2,
  },

  feedbackContainer: {
    justifyContent: "center",
    width: 72,
  },
  feedbackWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 8,
    columnGap: 12,
    paddingHorizontal: 10,
  },
  feedbackPin: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    borderWidth: 0.5,
  },

  colorBoxContainer: {
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
  colorBoxIcon: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
  },
  colorBoxItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  colorBoxItem: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
});

const button = StyleSheet.create({
  default: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  rules: {
    backgroundColor: "black",
  },
  reset: {
    backgroundColor: "#3FA128",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: "white",
  },
  textSmall: {
    fontSize: 10,
  },
});
