import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import { useState } from "react";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import { Sidebar, SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useSearchQuery, useDebounce } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberOfJobs = jobItems?.length || 0;

  const [currentPage, setCurrentPage] = useState(1);
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return Number(a.daysAgo) - Number(b.daysAgo);
    }
  });

  const jobItemsSliced =
    jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];

  const maxPage =
    totalNumberOfJobs !== 0
      ? Math.ceil(totalNumberOfJobs / RESULTS_PER_PAGE)
      : 0;

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      currentPage < Math.ceil(totalNumberOfJobs / RESULTS_PER_PAGE)
        ? setCurrentPage((prev) => prev + 1)
        : null;
    } else if (direction === "prev") {
      currentPage != 1 ? setCurrentPage((prev) => prev - 1) : null;
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo></Logo>
          <BookmarksButton></BookmarksButton>
        </HeaderTop>
        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchForm>
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfJobs={totalNumberOfJobs} />
            <SortingControls onClick={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading}></JobList>

          <PaginationControls
            onClick={handleChangePage}
            prevPage={currentPage - 1}
            nextPage={currentPage + 1}
            maxPage={maxPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer></Footer>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
