import { UUID } from "crypto";

export type PRCollection = {
  id: UUID;
  name: string;
  pendingQuant: number;
  projects: PRCollectionProject[];
};

export type PRCollectionProject = {
  id: UUID;
  name: string;
  pendingQuant: number;
  pullRequests: PRCollectionProjectPR[];
};

export type PRCollectionProjectPR = {
  id: number;
  name: string;
  ownerName: string;
  repositoryName: string;
  url: string;
  quantComents: number;
};
