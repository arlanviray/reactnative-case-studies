import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DATA from "./data";
import Card from "./components/Card";

export default function index() {
  const [cardsArray, setCardsArray] = useState<
    { name: string; image: string; matched: boolean }[]
  >([]);
  const [firstCard, setFirstCard] = useState<any>(null);
  const [secondCard, setSecondCard] = useState<any>(null);
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
  }, [level]);

  // console.log(cardsArray);

  return (
    <>
      {cardsArray.length ? (
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
            />
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
