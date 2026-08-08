export interface Finding {
  id: string;
  watchId: string;
  title: string;
  url: string;
  summary: string;
  significanceScore: number;
  publishedAt: Date;
  createdAt: Date;
  category: string;
}
