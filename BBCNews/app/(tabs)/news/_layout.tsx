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
  return (
    <>
      <SubNavigations navigations={navigations} bgcolor="#EB0101" />
      <SubStackScreen navigations={navigations} />
    </>
  );
}
