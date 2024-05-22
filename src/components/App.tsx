import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import { Sidebar, SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchJobs = async () => {
      if (!searchText) return;
      try {
        const resp = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        if (!resp.ok) throw new Error("Failed to fetch jobs");
        const data = await resp.json();
        setIsLoading(false);
        setJobItems(data.jobItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, [searchText]);

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
            <ResultsCount></ResultsCount>
            <SortingControls></SortingControls>
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading}></JobList>

          <PaginationControls></PaginationControls>
        </Sidebar>
        <JobItemContent></JobItemContent>
      </Container>

      <Footer></Footer>
    </>
  );
}

export default App;
