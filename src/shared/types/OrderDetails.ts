export type OrderDetails = {
  id: number;
  name: string;
  isModalShown: boolean;
  isRequest: boolean;
  isRequestFailed: boolean;
  isRequestSubmitted: boolean;
  error: unknown;
};
