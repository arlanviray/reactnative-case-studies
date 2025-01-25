import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";

import convert from "xml-js";

export default function Index() {
  const [data, setData] = useState<any | undefined>(undefined);
  const [xmlData, setXmlData] = useState(null);

  const getNews = async () => {
    try {
      const response = await fetch(
        "https://feeds.bbci.co.uk/news/technology/rss.xml"
      );
      const results = await response.text();

      // console.log(convert.xml2json(results));
      // console.log(convert.xml2js(results));

      const items = convert.xml2json(results, {
        compact: true,
        ignoreDeclaration: true,
        ignoreAttributes: true,
        attributesKey: "attributes",
        textKey: "text",
        cdataKey: "cdata",
      });
      const jsonItems = JSON.parse(items);

      // const data = JSON.stringify(JSON.parse(items));
      // console.log(JSON.stringify(JSON.parse(items)));
      // console.log(items);

      setData(results);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    // getNews();

    fetch("https://feeds.bbci.co.uk/news/technology/rss.xml") // Replace with the URL or path to your XML data
      .then((response) => response.text())
      .then((xmlText) => {
        const jsonData = convert.xml2json(xmlText, {
          compact: true,
          ignoreDeclaration: true,
          ignoreAttributes: true,
          attributesKey: "attributes",
          textKey: "text",
          cdataKey: "cdata",
        });
        setXmlData(JSON.parse(jsonData));
      })
      .catch((error) => {
        console.error("Error fetching XML data:", error);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Open WebBrowser Expo"
        onPress={() => WebBrowser.openBrowserAsync("https://expo.dev")}
      />
      <Button
        title="Open WebBrowser BBC"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            "https://www.bbc.co.uk/news/articles/cqjvqpkq81lo"
          )
        }
      />

      {xmlData ? (
        <>
          <Text>{JSON.stringify(xmlData.rss.channel.item[0].title.cdata)}</Text>
          <Text>{xmlData.rss.channel.item[0].title.cdata}</Text>
        </>
      ) : (
        <Text>Loading XML data...</Text>
      )}
    </View>
  );
}
