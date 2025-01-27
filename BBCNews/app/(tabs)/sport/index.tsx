import NewsList from "@/components/NewsList";

export default function Index() {
  return <NewsList xmlUrl="https://feeds.bbci.co.uk/sport/rss.xml" />;
}
