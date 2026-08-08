export interface Digest {
  id: string;
  watchId: string;
  summary: string;
  citations: string[];
  triggerScore: number;
  createdAt: string;
  deliveredEmail: boolean;
  deliveredSlack: boolean;
}
