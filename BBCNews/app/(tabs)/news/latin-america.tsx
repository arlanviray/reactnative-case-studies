import NewsList from "@/components/NewsList";

export default function LatinAmerica() {
  return (
    <NewsList xmlUrl="https://feeds.bbci.co.uk/news/world/latin_america/rss.xml" />
  );
}
