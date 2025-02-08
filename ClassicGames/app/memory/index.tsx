import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DATA from "./data";
import Card from "./components/Card";

export default function index() {
  const [cardsArray, setCardsArray] = useState<
    { name: string; image: string; matched: boolean }[]
  >([]);
  const [firstCard, setFirstCard] = useState<object | null>(null);
  const [secondCard, setSecondCard] = useState<object | null>(null);
  const [level, setLevel] = useState<number>(12);
  const [moves, setMoves] = useState<number>(0);
  const [stopFlip, setStopFlip] = useState<boolean>(false);

  const newGame = () => {
    setCardsArray([]);

    setTimeout(() => {
      // randomise data array
      const randomItems = DATA.sort(() => 0.5 - Math.random());
      // get x number of items in array
      const selectedItems = randomItems.slice(0, level);
      // clone and merge array
      const mergedItems = [...selectedItems, ...selectedItems];
      // add unique id from each item
      const cardItems = mergedItems.map((card, index) => ({
        id: index + 1,
        ...card,
      }));

      setCardsArray(cardItems.sort(() => 0.5 - Math.random())); // randomise final card items
      setFirstCard(null);
      setSecondCard(null);
      setMoves(0);
    }, 1000);
  };

  // starts the game for the first time.
  useEffect(() => {
    newGame();
  }, [level]);

  // console.log(cardsArray);

  return (
    <>
      {cardsArray.length ? (
        <View style={styles.cards}>
          {cardsArray.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </View>
      ) : (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    margin: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
