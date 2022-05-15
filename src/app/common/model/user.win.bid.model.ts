export interface UserWinBid {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bidPrice: number;
  bidDate: string;
  remainingPrice: number;
  currentUserWon: boolean;
  isPaymentRequired: boolean;
}
