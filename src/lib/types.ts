export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: string;
  relevanceScore: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  location: string;
  salary: string;
  duration: string;
  companyURL: string;
  coverImgURL: string;
  qualifications: string[];
  reviews: string[];
};

export type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

export type JobItemsApiResponse = {
  public: boolean;
  jobItems: JobItemExpanded[];
};

export type SortBy = "relevant" | "recent";

export type PageDirection = "next" | "prev";
