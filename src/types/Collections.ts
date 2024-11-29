import { UUID } from "crypto";

export type Collections = {
  id: UUID;
  inUse: boolean;
  name: string;
};
