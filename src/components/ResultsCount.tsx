import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfJobs } = useJobItemsContext();
  return <p className="count">{totalNumberOfJobs} results</p>;
}
