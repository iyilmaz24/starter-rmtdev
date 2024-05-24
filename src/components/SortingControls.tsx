import { useJobItemsContext } from "../lib/hooks";

export default function Sorting() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
        onClick={() => handleChangeSortBy("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" && "sorting__button--active"
        }`}
        onClick={() => handleChangeSortBy("recent")}
      >
        Recent
      </button>
    </section>
  );
}
