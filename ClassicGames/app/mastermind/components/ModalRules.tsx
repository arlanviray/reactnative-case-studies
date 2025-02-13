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
        <View style={styles.closeButton}>
          <Pressable onPress={closeModal}>
            <AntDesign name="closecircleo" color="#FFF" size={30} />
          </Pressable>
        </View>
        <Text style={styles.text}>
          Try to guess the pattern, in both order and color, within ten turns.
          Black pins represent the correct colored pin, in the correct place.
          White pins mean you have the correct colored pin, in the wrong place.
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#A9A9A9",
  },
  closeButton: {
    alignItems: "flex-end",
    margin: 12,
  },
  text: {
    fontSize: 15,
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
});
