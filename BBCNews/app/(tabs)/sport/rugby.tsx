import NewsList from "@/components/NewsList";

export default function Rugby() {
  return (
    <NewsList xmlUrl="https://feeds.bbci.co.uk/sport/rugby-league/rss.xml" />
  );
}
