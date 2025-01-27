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
  return (
    <>
      <SubNavigations navigations={navigations} bgcolor="#FFD230" />
      <SubStackScreen navigations={navigations} />
    </>
  );
}
