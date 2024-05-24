import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
}
