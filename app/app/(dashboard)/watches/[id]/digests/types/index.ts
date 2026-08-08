export interface Digest {
  id: string;
  watchId: string;
  summary: string;
  citations: string[];
  triggerScore: number;
  createdAt: Date;
  deliveredEmail: boolean;
  deliveredSlack: boolean;
}
