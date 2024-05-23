import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksContext();
  const isBookmarked = bookmarkedIds.includes(id);

  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${isBookmarked ? "filled" : ""}`}
        onClick={(e) => {
          handleToggleBookmark(id);
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </button>
  );
}
