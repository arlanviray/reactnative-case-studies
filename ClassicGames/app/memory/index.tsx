import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "@/helpers/AsyncStorage";
import { GameLevels } from "./data";

export default function index() {
  const navigation = useNavigation<any>();
  const [bestRecordedMoves, setBestRecordedMoves] = useState<any>(null);

  useEffect(() => {
    const getItemFromStorage = async () => {
      const items = await getItem("MG_BestRecordedMoves");
      setBestRecordedMoves(items);
    };

    getItemFromStorage();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {GameLevels.map(({ level }, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("game", { level: level.toLowerCase() })
            }
            style={styles.buttonContainer}
          >
            <Text style={[styles.center, styles.bigText]}>{level}</Text>

            {bestRecordedMoves && bestRecordedMoves[index].moves > 0 && (
              <Text style={[styles.center, styles.smallText]}>
                BEST RECORDED MOVES: {bestRecordedMoves[index].moves}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 260,
    backgroundColor: "#E4EFFF",
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 10,
    paddingVertical: 20,
  },
  bigText: {
    fontSize: 30,
    fontWeight: "700",
  },
  smallText: {
    fontSize: 12,
    marginTop: 4,
  },
  center: {
    textAlign: "center",
  },
});
