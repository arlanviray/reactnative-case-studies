import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = PropsWithChildren<{
  isVisible: boolean;
  closeModal: () => void;
}>;

export default function ModalHint({ children, isVisible, closeModal }: Props) {
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
        <Text style={styles.text}>{children}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: "25%",
    width: "100%",
    backgroundColor: "#A9A9A9",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
