export interface ProfileUserBid {
  sequence: number;
  productId: number;
  productName: string;
  categoryName: string;
  productStartDateTime: string;
  productEndDateTime: string;
  productStatus: string;
  basePrice: number;
  bidPrice: number;
  bidDateTime: string;
  bidStatus: string;
  firstImageData: any;
}
