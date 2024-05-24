import { createContext, useCallback, useMemo } from "react";
import { useState } from "react";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchTextContext, useSearchQuery } from "../lib/hooks";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemsContextT = {
  totalNumberOfJobs: number;
  currentPage: number;
  jobItemsSliced: JobItem[];
  maxPage: number;
  isLoading: boolean;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextT | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext(); // depedency of SearchTextContext
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberOfJobs = jobItems?.length || 0;

  const [currentPage, setCurrentPage] = useState(1);
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return Number(a.daysAgo) - Number(b.daysAgo);
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  const maxPage =
    totalNumberOfJobs !== 0
      ? Math.ceil(totalNumberOfJobs / RESULTS_PER_PAGE)
      : 0;

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      totalNumberOfJobs,
      currentPage,
      jobItemsSliced,
      maxPage,
      isLoading,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      totalNumberOfJobs,
      currentPage,
      jobItemsSliced,
      maxPage,
      isLoading,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
