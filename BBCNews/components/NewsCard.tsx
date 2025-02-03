import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  item: any;
};

export default function NewsCard({ item }: Props) {
  const { thumbnail, title, description, link, pubDate } = item;
  const date = new Date(pubDate);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: thumbnail }} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.button}
          onPress={() => WebBrowser.openBrowserAsync(link)}
        >
          <Ionicons name="information-circle-sharp" size={24} color="white" />
          <Text style={styles.buttonText}>Read more</Text>
        </Pressable>
        <Text>
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    height: 150,
    marginBottom: 10,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#B80200",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonText: {
    color: "white",
  },
});
