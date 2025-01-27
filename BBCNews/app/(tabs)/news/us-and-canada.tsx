import NewsList from "@/components/NewsList";

export default function USAndCanada() {
  return (
    <NewsList xmlUrl="https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml" />
  );
}
