import { Key, useEffect, useState } from "react";
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
  const [rowGuessId, setRowGuessId] = useState<number>(-1);
  const [colGuessId, setColGuessId] = useState<number>(-1);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

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

  console.log(codeMaker, codeBreaker);

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.button}>Game Rules</Text>
      </Pressable>
      <View style={styles.gameContainer}>
        <View style={[styles.pinsRows, { borderTopWidth: 0 }]}>
          <Text style={{ fontSize: 11, width: 30, paddingLeft: 10 }}></Text>
          <View style={styles.pinsGuesses}>
            {codeMaker.map((color, index) => (
              <View
                key={index}
                style={[styles.pinsLarge, { backgroundColor: color }]}
              ></View>
            ))}
          </View>
          <View style={styles.pinsResults}></View>
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          {codeBreaker.map((item, itemRowIndex) => {
            const rowCounter = itemRowIndex + 1;

            return (
              <View style={styles.pinsRows} key={itemRowIndex}>
                <Text style={{ fontSize: 11, width: 30, paddingLeft: 10 }}>
                  {rowCounter < 10 && "0"}
                  {rowCounter}
                </Text>

                <View style={styles.pinsGuesses}>
                  {item.guesses.map(
                    (guessColor: string, guessColIndex: number) => (
                      <View key={guessColIndex}>
                        <Pressable
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

                <View style={styles.pinsResults}>
                  <View style={styles.pinsSmall}></View>
                  <View style={styles.pinsSmall}></View>
                  <View style={styles.pinsSmall}></View>
                  <View style={styles.pinsSmall}></View>
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
  pinsGuesses: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: colorLightGray,
    borderStyle: "solid",
  },
  pinsResults: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    width: 72,
    paddingHorizontal: 20,
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
