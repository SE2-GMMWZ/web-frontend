export type GuideData = {
  guide_id: string;
  title: string;
  content: string;
  author_id: string;
  publication_date: string;
  images: string[];
  links: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  is_approved: boolean;
}

export type GuideEnriched = GuideData & {
  author_name: string;
};