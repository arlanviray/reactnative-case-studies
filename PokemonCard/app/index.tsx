import { FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { Data } from "@/data/data";
import PokemonButton from "@/components/PokemonButton";
import PokemonModal from "@/components/PokemonModal";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<object>(Data[0]);

  const onModalOpen = (index: number) => {
    setIsModalVisible(true);
    setDataModal(
      Data.filter((item: { num: number }) => item.num === index).pop()
    );
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.num.toString()}
        renderItem={({ item }) => (
          <PokemonButton item={item} showModal={onModalOpen} />
        )}
        style={styles.container}
      />
      <PokemonModal
        isVisible={isModalVisible}
        closeModal={onModalClose}
        data={dataModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
