import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";

type BookmarksContextT = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextT | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkIds(bookmarkedIds.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
