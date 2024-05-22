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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItemsSliced, isLoading, totalNumberOfJobs } =
    useJobItems(debouncedSearchText);

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

          <PaginationControls></PaginationControls>
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer></Footer>
    </>
  );
}

export default App;
