import { Ingredient } from "./Ingredient";
export type Feed = Ingredient[];

export enum FeedActionType {
  DATA = "data",
  UPDATE = "update",
}

export type Data = {
  type: FeedActionType.DATA;
  data: Feed;
};

export type Update = {
  type: FeedActionType.UPDATE;
  data: Ingredient[];
};
export type FeedAction = Data | Update;
export type FeedActions = FeedAction[];
