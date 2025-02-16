import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
  isVisible: boolean;
  gameOver: boolean;
  statusWon: boolean;
  closeModal: () => void;
};

export default function ModalDisplay({
  isVisible,
  gameOver,
  statusWon,
  closeModal,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => closeModal}
    >
      {gameOver ? (
        <View style={styles.containerGameOver}>
          <Text style={[styles.title, styles.colorBlack]}>Game Over!!!</Text>
          <Entypo
            name={statusWon ? "emoji-happy" : "emoji-sad"}
            size={40}
            color="#000"
            style={styles.icon}
          />
          <Text style={[styles.text, styles.colorBlack]}>
            You {statusWon ? "won" : "failed"}
          </Text>
          <Pressable style={styles.button} onPress={closeModal}>
            <Text style={[styles.buttonText, styles.colorWhite]}>
              Play again?
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, styles.colorWhite]}>Game Rules</Text>
            <Pressable onPress={closeModal}>
              <AntDesign name="closecircleo" color="#FFF" size={30} />
            </Pressable>
          </View>

          <Text style={[styles.text, , styles.colorWhite]}>
            Try to guess the pattern, in both order and color, within ten turns.
            Black pins represent the correct colored pin, in the correct place.
            White pins mean you have the correct colored pin, in the wrong
            place.
          </Text>
          <Text style={[styles.text, , styles.colorWhite]}>Good Luck!</Text>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    backgroundColor: "black",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  containerGameOver: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },

  colorBlack: {
    color: "#000",
  },

  colorWhite: {
    color: "#FFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  text: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  icon: {
    marginTop: 10,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
