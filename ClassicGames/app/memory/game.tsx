import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { setItem, getItem } from "@/helpers/AsyncStorage";
import DATA, { AsyncStorageKey, GameLevels } from "./data";
import Card from "./components/Card";

const { height } = Dimensions.get("window");

export default function index() {
  const urlParam = useGlobalSearchParams();
  const getLevel = GameLevels.filter(
    (item: { level: string }) => item.level.toLowerCase() === urlParam.level
  );
  const numberOfTiles = getLevel[0]?.tiles;

  const [cardsArray, setCardsArray] = useState<
    { name: string; image: string; matched: boolean }[]
  >([]);
  const [firstCard, setFirstCard] = useState<any>(null);
  const [secondCard, setSecondCard] = useState<any>(null);
  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [moveWon, setMoveWon] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [tiles, setTiles] = useState<number>(0);
  const [newRecord, setNewRecord] = useState<boolean>(false);

  // enable ScrollView based on the content size
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    setScreenHeight(contentHeight);
  };
  const scrollEnabled = screenHeight > height;

  // #
  // actual game logic
  // #
  const newGame = () => {
    setCardsArray([]);
    setTiles(numberOfTiles);

    setTimeout(() => {
      // randomise data array
      const randomItems = DATA.sort(() => 0.5 - Math.random());
      // get x number of items in array
      const selectedItems = randomItems.slice(0, tiles);
      // clone and merge array
      const mergedItems = [...selectedItems, ...selectedItems];
      // add unique id from each item
      const cardItems = mergedItems.map((card, index) => ({
        id: index + 1,
        ...card,
      }));

      // randomise final card items
      setCardsArray(cardItems.sort(() => 0.5 - Math.random()));
      // reset
      setFirstCard(null);
      setSecondCard(null);
      setStopFlip(false);
      setMoveWon(0);
      setMoves(0);
      setNewRecord(false);
    }, 1000);
  };

  // this function helps in storing the firstCard and secondCard value
  const onSelectedCards = (item: any) => {
    // console.log("onSelectedCards", item);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  };

  // after the selected images have been checked for equivalency we empty the firstCard and secondCard component
  const removeSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevValue) => prevValue + 1);
  };

  // if two have been selected then we check if the images are same or not,
  // if they are same then we stop the flipping ability
  // else we turn them back
  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);

      if (firstCard.name === secondCard.name) {
        setCardsArray((prevArray) => {
          return prevArray.map((unit) => {
            if (unit.name === firstCard.name) {
              return { ...unit, matched: true };
            } else {
              return unit;
            }
          });
        });
        setMoveWon((prevVal) => prevVal + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  // starts the game for the first time.
  useEffect(() => {
    newGame();
  }, [tiles]);

  // set async storage for all levels
  useEffect(() => {
    // set initial storage key and values to be update
    const initStorage = async () => {
      let data: any = [];
      GameLevels.map((obj) => data.push({ level: obj.level, moves: 0 }));

      const recordedMoves = await getItem(AsyncStorageKey);
      if (!recordedMoves) {
        await setItem(AsyncStorageKey, data);
      }
    };

    initStorage();
  }, []);

  useEffect(() => {
    // update storage base from the level value
    if (moveWon && moveWon === tiles) {
      const setItemToStorage = async () => {
        const recordedMoves = await getItem(AsyncStorageKey);

        const updateRecordedMoves = recordedMoves.map(
          (objVal: { level: string; moves: number }) =>
            objVal.level.toLowerCase() === urlParam.level
              ? { level: objVal.level, moves: moves }
              : objVal
        );

        const getCurrentLevel = recordedMoves.filter(
          (objVal: { level: string }) =>
            objVal.level.toLowerCase() === urlParam.level
        );
        const getCurrentMoves = getCurrentLevel[0]?.moves;

        // only set to storage if has new best recorded moves
        // less than the previous one
        if (moves < getCurrentMoves) {
          await setItem(AsyncStorageKey, updateRecordedMoves);
          setNewRecord(true);
        }
      };

      setItemToStorage();
    }
  }, [moveWon]);

  // console.log(cardsArray);

  return (
    <>
      {cardsArray.length ? (
        <>
          <ScrollView
            scrollEnabled={scrollEnabled}
            onContentSizeChange={onContentSizeChange}
          >
            {moveWon === tiles ? (
              <View style={styles.container}>
                <Text style={[styles.center, styles.fontLarge]}>
                  You Won in{" "}
                  <Text style={[styles.moves, styles.wonColor]}>{moves}</Text>{" "}
                  moves
                </Text>

                {newRecord && (
                  <>
                    <View style={styles.newrecord}>
                      <Entypo
                        name="emoji-happy"
                        size={40}
                        style={[styles.newrecordIcon, styles.wonColor]}
                      />
                      <Text style={[styles.center, styles.wonColor]}>
                        You have set a new record!!!
                      </Text>
                    </View>
                  </>
                )}

                <Pressable onPress={newGame} style={styles.button}>
                  <Text style={styles.buttonText}>Play again?</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={styles.marginVertical}>
                  <Text style={styles.center}>
                    Number of moves: <Text style={styles.moves}>{moves}</Text>
                  </Text>
                </View>
                <View style={styles.cards}>
                  {cardsArray.map((item, index) => (
                    <Card
                      key={index}
                      item={item}
                      selectedCards={onSelectedCards}
                      toggled={
                        item === firstCard ||
                        item === secondCard ||
                        item.matched === true
                      }
                      stopFlip={stopFlip}
                      tiles={tiles}
                    />
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        </>
      ) : (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  fontLarge: {
    fontSize: 28,
  },
  marginVertical: {
    marginTop: 30,
    marginBottom: 20,
  },
  moves: {
    fontWeight: "700",
    color: "red",
  },
  center: {
    textAlign: "center",
  },
  wonColor: {
    color: "#54b754",
  },
  newrecord: {
    marginTop: 10,
  },
  newrecordIcon: {
    marginHorizontal: "auto",
    marginBottom: 6,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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
