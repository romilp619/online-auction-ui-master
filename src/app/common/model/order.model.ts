export interface Order {
  sequence: number;
  orderId: string;
  isOrderSuccess: boolean;
  orderAmount: number;
  orderDate: string;
  contactPerson: string;
  contactNo: number;
  email: string;
  fullAddress: string;
  transactionDate: string;
  paymentMode: string;
  paymentBank: string;
  currency: string;
  products: [];
}
