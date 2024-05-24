import { useState, useEffect, useContext } from "react";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  JobItemApiResponse,
  JobItemExpanded,
  JobItemsApiResponse,
} from "./types";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";

const fetchJobItem = async (jobItemId: number): Promise<JobItemApiResponse> => {
  const resp = await fetch(`${BASE_API_URL}/${jobItemId}`);
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.description);
  return data;
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const resp = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.description);
  return data;
};

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => setActiveId(+window.location.hash.slice(1));
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
}

export function useJobItem(jobItemId: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", jobItemId],
    async () => (jobItemId ? fetchJobItem(jobItemId) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!jobItemId,
      onError: (err) => handleError(err, "Job not found"),
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return [jobItem, isLoading] as const;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const [activeJobItem, isLoading] = useJobItem(activeId);
  return [activeJobItem, isLoading] as const;
}

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (err) => handleError(err, "Failed to fetch jobs list"),
    }
  );

  const jobItems = data?.jobItems;
  const isLoading = isInitialLoading;
  return { jobItems, isLoading } as const;
}

export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (err: unknown) => handleError(err, "Failed to fetch jobs list"),
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);
  return {
    jobItems,
    isLoading,
  };
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    // if the user clicks outside of any passed refs, call handler
    const handleClick = (e: MouseEvent) => {
      e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node)) &&
        handler();
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
// -----------------------------------------------------

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useContext(BookmarksContext) must be used within a BookmarksContext.Provider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useContext(ActiveIdContext) must be used within a ActiveIdContext.Provider"
    );
  }
  return context;
}
