import { useState } from "react";
import SubStackScreen from "@/components/SubStackScreen";
import SubNavigations from "@/components/SubNavigations";

const navigations = [
  "Home",
  "UK",
  "Africa",
  "Asia",
  "Australia",
  "Latin America",
  "Middle East",
  "US & Canada",
];

export default function NewsLayout() {
  const [urlId, setUrlId] = useState(0);

  const onPress = (id: number) => {
    setUrlId(id);
  };

  return (
    <>
      <SubNavigations
        navigations={navigations}
        bgcolor="#EB0101"
        urlId={urlId}
        onPress={onPress}
      />
      <SubStackScreen navigations={navigations} />
    </>
  );
}
