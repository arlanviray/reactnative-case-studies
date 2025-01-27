import NewsList from "@/components/NewsList";

export default function Science() {
  return (
    <NewsList xmlUrl="https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" />
  );
}
