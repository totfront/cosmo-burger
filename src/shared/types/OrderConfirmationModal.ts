export type TOrderConfirmationModal = {
  id: number;
  name: string;
  isModalShown: boolean;
  isRequest: boolean;
  isRequestFailed: boolean;
  isRequestSuccess: boolean;
  error: Error | null;
};
