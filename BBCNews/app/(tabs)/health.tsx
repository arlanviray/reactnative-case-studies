import NewsList from "@/components/NewsList";

export default function Health() {
  return <NewsList xmlUrl="https://feeds.bbci.co.uk/news/health/rss.xml" />;
}
