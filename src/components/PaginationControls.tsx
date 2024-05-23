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
  return (
    <section className="pagination">
      {prevPage != 0 ? (
        <button className="pagination__button" onClick={() => onClick("prev")}>
          <ArrowLeftIcon /> Page {prevPage}
        </button>
      ) : (
        <button
          className="pagination__button"
          onClick={() => onClick("prev")}
          disabled
        >
          On First Page
        </button>
      )}

      {maxPage === 0 ? null : nextPage - 1 !== maxPage ? (
        <button className="pagination__button" onClick={() => onClick("next")}>
          Page {nextPage} <ArrowRightIcon />
        </button>
      ) : (
        <button
          className="pagination__button"
          onClick={() => onClick("next")}
          disabled
        >
          On Final Page
        </button>
      )}
    </section>
  );
}
