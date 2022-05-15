export interface UserPostedProduct {
  sequence: number;
  productId: number;
  productName: string;
  categoryName: string;
  productStartDateTime: string;
  productEndDateTime: string;
  productStatus: string;
  basePrice: number;
  firstImageData: any;
}
