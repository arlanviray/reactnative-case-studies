import { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const colorGray = "#A0A1A0";

export default function index() {
  const ref = useRef();
  const [rowId, setRowId] = useState(-1);
  const [colId, setColId] = useState(-1);
  const [showColorBox, setShowColorBox] = useState(false);

  const colorBox = () => {
    return (
      <View style={styles.colorBox}>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    );
  };

  const handleLayout = (event: {
    nativeEvent: {
      layout: { x: any; y: any; width: any; height: any; px: any; py: any };
    };
  }) => {
    const { x, y, width, height, px, py } = event.nativeEvent.layout;
    console.log(x, y, width, height, px, py);
  };

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.button}>Game Rules</Text>
      </Pressable>
      <View style={styles.gameContainer}>
        {Array.from(Array(10)).map((_, indRow) => {
          const indRowId = indRow + 1;
          return (
            <View style={styles.pinsRows} key={indRow}>
              <Text>
                {indRowId < 10 && "0"}
                {indRowId}
              </Text>

              <View style={styles.pinsGuesses}>
                {Array.from(Array(4)).map((_, indexCol) => (
                  <View style={{ backgroundColor: "red" }} key={indexCol}>
                    <Pressable
                      onPress={() => {
                        setRowId(indRow);
                        setColId(indexCol);
                        setShowColorBox(
                          showColorBox && rowId === indRow && colId === indexCol
                            ? false
                            : true
                        );
                      }}
                    >
                      <View style={styles.pinsLarge}></View>
                    </Pressable>
                    {showColorBox &&
                      rowId === indRow &&
                      colId === indexCol &&
                      colorBox()}
                  </View>
                ))}
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
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorGray,
    marginTop: 10,
    flexDirection: "column-reverse",
  },
  pinsRows: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  pinsGuesses: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 10,
    borderRightWidth: 2,
    borderRightColor: colorGray,
  },
  pinsLarge: {
    width: 26,
    height: 26,
    backgroundColor: "#E4EFFF",
    borderRadius: "50%",
    borderWidth: 2,
  },
  pinsResults: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    width: 72,
    paddingHorizontal: 20,
  },
  pinsSmall: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    borderWidth: 0.5,
  },
  colorBox: {
    zIndex: 10,
    position: "absolute",
    top: 30,
    alignSelf: "center",
    width: 100,
    height: 80,
    backgroundColor: "green",
  },
});
