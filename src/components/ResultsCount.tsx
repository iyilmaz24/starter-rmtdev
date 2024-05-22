export default function ResultsCount({
  totalNumberOfJobs,
}: {
  totalNumberOfJobs: number;
}) {
  return <p className="count">{totalNumberOfJobs} results</p>;
}
