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
import { useJobItems, useDebounce } from "../lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalNumberOfJobs = jobItems?.length || 0;
  const jobItemsSliced = jobItems?.slice(0, 7) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage =
    totalNumberOfJobs !== 0 ? Math.ceil(totalNumberOfJobs / 7) : 0;
  const handleChangePage = (direction: "next" | "prev") => {
    console.log(direction);
    if (direction === "next") {
      currentPage < Math.ceil(totalNumberOfJobs / 7)
        ? setCurrentPage((prev) => prev + 1)
        : null;
    } else if (direction === "prev") {
      currentPage != 1 ? setCurrentPage((prev) => prev - 1) : null;
    }
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
            <SortingControls></SortingControls>
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
