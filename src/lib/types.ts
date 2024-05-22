export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: string;
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
