import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

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
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!jobItemId) return;
    const getJobDetails = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(`${BASE_API_URL}/${jobItemId}`);
        if (!resp.ok) throw new Error("Failed to fetch job details");
        const data = await resp.json();
        setIsLoading(false);
        setJobItem(data.jobItem);
      } catch (err) {
        console.log(err);
      }
    };
    getJobDetails();
  }, [jobItemId]);

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

  return [jobItemsSliced, isLoading] as const;
}
