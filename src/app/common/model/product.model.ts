export interface Product {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  categoryDescription: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  price: number;
  postedBy: string;
  imageIds: [];
  isLive: boolean;
  isExpired: boolean;
  isUpcoming: boolean;
  firstImageData: string;
  imageDataList: [];
  ownerUsername: string;
  canAddToCart: boolean;
  userBiddingDetails: [];
  userWinBid: any;
  orderId: any;
}
