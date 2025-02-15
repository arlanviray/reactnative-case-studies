import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const colorVariations = ["red", "blue", "green", "yellow", "purple", "pink"];
const colorGray = "#A0A1A0";
const colorLightGray = "#DCDCDC";

export default function index() {
  const maxPegs = 4;
  const maxGames = 10;
  const [codeMaker, setCodeMaker] = useState<string[]>([]);
  const [codeBreaker, setCodeBreaker] = useState<any[]>([]);
  const [rowGuessId, setRowGuessId] = useState<number>(0);
  const [colGuessId, setColGuessId] = useState<number | null>(null);
  const [checkGuess, setCheckGuess] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const colorBoxPicker = () => {
    return (
      <View style={styles.colorBoxContainer}>
        <View style={styles.colorBoxIcon}>
          <AntDesign name="caretup" size={14} />
        </View>

        <View style={styles.colorBox}>
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

  const onCheckGuess = () => {
    setRowGuessId((prevState) => prevState + 1);
    setColGuessId(null);
    setCheckGuess(false);
  };

  const setCodeMakerPattern = () => {
    let colors: string[] = [];
    // duplicate array 4 times for possibilty of having the same colors
    Array.from(Array(maxPegs)).map((_, index) =>
      colors.push(...colorVariations)
    );
    // randomise value
    colors.sort(() => Math.random() - 0.5);
    // pick the first 4 items in array
    const chosenColors = colors.slice(0, maxPegs);

    setCodeMaker(chosenColors);
  };

  const setCodeBreakerInitValue = () => {
    // add 4 items with null value in array of guesses
    const objVal = { guesses: Array(maxPegs).fill(null), feedback: [] };

    let arrValue: any[] = [];
    Array.from(Array(maxGames)).map((_, index) => arrValue.push(objVal));

    setCodeBreaker(arrValue);
  };

  const newGame = () => {
    setCodeMakerPattern();
    setCodeBreakerInitValue();
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

  console.log(codeMaker, codeBreaker);

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.button}>Game Rules</Text>
      </Pressable>
      <View style={styles.gameContainer}>
        <View style={[styles.pinsRows, { borderTopWidth: 0 }]}>
          <Text style={{ fontSize: 11, width: 30, paddingLeft: 10 }}></Text>

          <View style={styles.pinsGuessesContainer}>
            <View style={styles.pinsGuesses}>
              {codeMaker.map((color, index) => (
                <View
                  key={index}
                  style={[styles.pinsLarge, { backgroundColor: color }]}
                ></View>
              ))}
            </View>
          </View>

          <View style={styles.pinsResultsContainer}>
            <View style={styles.pinsResults}></View>
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
              backgroundColor: rowGuessId > itemRowIndex ? colorGray : "none",
            };

            return (
              <View style={[styles.pinsRows, itemRowDone]} key={itemRowIndex}>
                <Text
                  style={[
                    { fontSize: 11, width: 30, paddingLeft: 10 },
                    activeOpacity,
                  ]}
                >
                  {rowCounter < 10 && "0"}
                  {rowCounter}
                </Text>

                <View style={styles.pinsGuessesContainer}>
                  <View style={[styles.pinsGuesses, activeOpacity]}>
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
                                styles.pinsLarge,
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

                <View style={styles.pinsResultsContainer}>
                  <View style={styles.pinsResults}>
                    <View style={styles.pinsSmall}></View>
                    <View style={styles.pinsSmall}></View>
                    <View style={styles.pinsSmall}></View>
                    <View style={styles.pinsSmall}></View>
                  </View>
                  {checkGuess && rowGuessId === itemRowIndex && (
                    <Pressable
                      onPress={onCheckGuess}
                      style={styles.buttonCheck}
                    >
                      <Text>Check</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
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

  button: {
    fontSize: 10,
    color: "white",
    backgroundColor: "black",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonCheck: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },

  gameContainer: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorGray,
    marginTop: 10,
  },
  pinsRows: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colorLightGray,
  },

  pinsGuessesContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colorLightGray,
    borderStyle: "solid",
  },
  pinsGuesses: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 10,
  },

  pinsResultsContainer: {
    justifyContent: "center",
    width: 72,
    height: "100%",
  },
  pinsResults: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 8,
    columnGap: 12,
    paddingHorizontal: 10,
  },

  pinsLarge: {
    width: 26,
    height: 26,
    backgroundColor: "#E4EFFF",
    borderRadius: "50%",
    borderWidth: 2,
  },
  pinsSmall: {
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
  colorBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  colorBoxIcon: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
  },
  colorBoxItem: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
});
