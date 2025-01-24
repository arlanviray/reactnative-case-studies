import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PokemonIcons from "./PokemonIcons";

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  data: any;
};

export default function PokemonModal({ isVisible, closeModal, data }: Props) {
  const { name, description, image, types, specie, height, weight, abilities } =
    data.variations[0];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => closeModal}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.modalContainer}>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <AntDesign name="closecircleo" color="#fff" size={30} />
            </Pressable>

            <View style={styles.nameContainer}>
              <Text style={[styles.textColor, styles.nameText]}>{name}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>
            <View style={styles.iconContainer}>
              <PokemonIcons types={types} />
            </View>
            <Text style={[styles.textColor, styles.descriptionText]}>
              <FontAwesome6 name="circle-info" color="#fff" size={18} />
              {"  "}
              {description}
            </Text>

            <View style={styles.textColumns}>
              <Text style={[styles.textColor, styles.textBold]}>Specie:</Text>
              <Text style={styles.textColor}>{specie}</Text>
            </View>
            <View style={styles.textColumns}>
              <Text style={[styles.textColor, styles.textBold]}>Height:</Text>
              <Text style={styles.textColor}>{height}m</Text>
            </View>
            <View style={styles.textColumns}>
              <Text style={[styles.textColor, styles.textBold]}>Weigth:</Text>
              <Text style={styles.textColor}>{weight}kg</Text>
            </View>
            <View style={styles.textColumns}>
              <Text style={[styles.textColor, styles.textBold]}>
                Abilities:
              </Text>
              <Text style={styles.textColor}>{abilities.join(", ")}</Text>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#0081F1",
  },
  closeButton: {
    alignItems: "flex-end",
  },
  textColor: {
    color: "white",
  },
  textBold: {
    fontWeight: "700",
  },
  textColumns: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 260,
    height: 260,
    backgroundColor: "white",
    borderRadius: "50%",
    marginHorizontal: "auto",
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "stretch",
    margin: "auto",
  },
  iconContainer: {
    alignItems: "center",
  },
  descriptionText: {
    margin: 20,
  },
});
