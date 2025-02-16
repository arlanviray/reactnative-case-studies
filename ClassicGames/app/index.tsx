import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function index() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/classic-games.png")}
        resizeMode="cover"
        style={styles.bgImage}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Play your game</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E4EFFF",
    borderWidth: 4,
    borderRadius: 18,
    padding: 8,
    marginBottom: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    backgroundColor: "black",
    borderRadius: 14,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
