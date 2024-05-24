import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function Pagination() {
  const { currentPage, maxPage, handleChangePage } = useJobItemsContext();

  const setPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: PageDirection
  ) => {
    handleChangePage(direction);
    e.currentTarget.blur();
  };

  return (
    <section className="pagination">
      {currentPage - 1 != 0 ? (
        <button
          className="pagination__button"
          onClick={(e) => setPage(e, "prev")}
        >
          <ArrowLeftIcon /> Page {currentPage - 1}
        </button>
      ) : (
        <button className="pagination__button" disabled>
          On First Page
        </button>
      )}

      {maxPage === 0 ? null : currentPage !== maxPage ? (
        <button
          className="pagination__button"
          onClick={(e) => setPage(e, "next")}
        >
          Page {currentPage + 1} <ArrowRightIcon />
        </button>
      ) : (
        <button className="pagination__button" disabled>
          On Final Page
        </button>
      )}
    </section>
  );
}
