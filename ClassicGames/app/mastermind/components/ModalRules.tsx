import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  isVisible: boolean;
  closeModal: () => void;
};

export default function ModalHint({ isVisible, closeModal }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => closeModal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Game Rules</Text>
          <View style={styles.button}>
            <Pressable onPress={closeModal}>
              <AntDesign name="closecircleo" color="#FFF" size={30} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.text}>
          Try to guess the pattern, in both order and color, within ten turns.
          Black pins represent the correct colored pin, in the correct place.
          White pins mean you have the correct colored pin, in the wrong place.
        </Text>
        <Text style={styles.text}>Good Luck!</Text>
      </View>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },

  button: {},

  text: {
    fontSize: 15,
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
});
