import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
  onClick: (direction: "next" | "prev") => void;
  prevPage: number;
  nextPage: number;
  maxPage: number;
};

export default function Pagination({
  onClick,
  prevPage,
  nextPage,
  maxPage,
}: PaginationProps) {
  const setPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: "next" | "prev"
  ) => {
    onClick(direction);
    e.currentTarget.blur();
  };

  return (
    <section className="pagination">
      {prevPage != 0 ? (
        <button
          className="pagination__button"
          onClick={(e) => setPage(e, "prev")}
        >
          <ArrowLeftIcon /> Page {prevPage}
        </button>
      ) : (
        <button className="pagination__button" disabled>
          On First Page
        </button>
      )}

      {maxPage === 0 ? null : nextPage - 1 !== maxPage ? (
        <button
          className="pagination__button"
          onClick={(e) => setPage(e, "next")}
        >
          Page {nextPage} <ArrowRightIcon />
        </button>
      ) : (
        <button className="pagination__button" disabled>
          On Final Page
        </button>
      )}
    </section>
  );
}
