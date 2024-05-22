import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

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
  const { data, isLoading } = useQuery(
    ["job-item", jobItemId],
    async () => {
      const resp = await fetch(`${BASE_API_URL}/${jobItemId}`);
      if (!resp.ok) throw new Error("Failed to fetch job details");
      const data = await resp.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!jobItemId,
      onError: (err) => console.log(err),
    }
  );
  const jobItem: JobItemExpanded = data?.jobItem;
  return [jobItem, isLoading] as const;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const [activeJobItem, isLoading] = useJobItem(activeId);
  return [activeJobItem, isLoading] as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfJobs = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(`${BASE_API_URL}?search=${searchText}`);
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

  return { jobItemsSliced, isLoading, totalNumberOfJobs } as const;
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
