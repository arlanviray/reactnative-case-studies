import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import convert from "xml-js";
import NewsCard from "./NewsCard";

type Props = {
  xmlUrl: string;
  xmlHeaderTitle?: boolean;
};

export default function NewsList({ xmlUrl, xmlHeaderTitle = true }: Props) {
  const [xmlData, setXmlData] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getXMLData = async () => {
    try {
      const response = await fetch(xmlUrl);
      const xmlText = await response.text();
      const jsonData = convert.xml2json(xmlText, {
        compact: true,
        ignoreDeclaration: true,
        ignoreAttributes: false,
        attributesKey: "attributes",
        textKey: "text",
        cdataKey: "cdata",
        elementNameFn: (val) => {
          return val.replace("media:", "");
        },
      });
      setXmlData(JSON.parse(jsonData));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Done!");
    }
  };

  useEffect(() => {
    getXMLData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform the data fetching or refreshing action here
    getXMLData();
    // Once the action is complete, set refreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      {xmlData ? (
        <>
          {xmlHeaderTitle && (
            <Tabs.Screen
              options={{ headerTitle: xmlData.rss.channel.description.cdata }}
            />
          )}

          <FlatList
            data={xmlData.rss.channel.item}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <NewsCard item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.flatList}
          />
        </>
      ) : (
        <View style={styles.loadContainer}>
          <ActivityIndicator />
          <Text style={styles.loadText}>loading data...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "white",
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadText: {
    marginTop: 10,
  },
});
