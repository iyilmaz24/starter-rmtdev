import { SortBy } from "../lib/types";

type SortingProps = {
  onClick: (newSortBy: "relevant" | "recent") => void;
  sortBy: SortBy;
};

export default function Sorting({ onClick, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" && "sorting__button--active"
        }`}
        onClick={() => onClick("recent")}
      >
        Recent
      </button>
    </section>
  );
}
