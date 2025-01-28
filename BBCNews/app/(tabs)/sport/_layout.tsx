import { useState } from "react";
import SubStackScreen from "@/components/SubStackScreen";
import SubNavigations from "@/components/SubNavigations";

const navigations = [
  "Home",
  "Athletics",
  "Boxing",
  "Football",
  "Rugby",
  "Swimming",
  "Tennis",
];

export default function SportLayout() {
  const [urlId, setUrlId] = useState(0);

  const onPress = (id: number) => {
    setUrlId(id);
  };

  return (
    <>
      <SubNavigations
        navigations={navigations}
        bgcolor="#FFD230"
        urlId={urlId}
        onPress={onPress}
      />
      <SubStackScreen navigations={navigations} />
    </>
  );
}
