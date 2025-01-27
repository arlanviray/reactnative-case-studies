import NewsList from "@/components/NewsList";

export default function Europe() {
  return (
    <NewsList xmlUrl="https://feeds.bbci.co.uk/news/world/europe/rss.xml" />
  );
}
