import {environment} from 'src/environments/environment';

const serverUrl = environment.baseUrl;

export const APP_URL = {

  HOST: '/',
  HOME: '/home',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CART: '/cart',
  PRODUCT_LISTING: '/product-listing',
  BACKEND_LOGIN: serverUrl + '/login',
  BACKEND_LOGOUT: serverUrl + '/logout',
  BACKEND_REGISTER: serverUrl + '/register',
  BACKEND_PROFILE: serverUrl + '/profile',
  BACKEND_CATEGORY: serverUrl + '/category',
  BACKEND_PRODUCT: serverUrl + '/product',
  BACKEND_DOWNLOAD_IMAGE: serverUrl + '/download',
  BACKEND_ADD_TO_CART: serverUrl + '/addToCart',
  BACKEND_CART_PRODUCTS: serverUrl + '/cartProducts',
  BACKEND_REMOVE_FROM_CART: serverUrl + '/removeFromCart',
  BACKEND_PAYMENT: serverUrl + '/payment',
  BACKEND_CHANGE_PASSWORD: serverUrl + '/changePassword',
  BACKEND_RESET_PASSWORD: serverUrl + '/resetPassword',
  BACKEND_ORDERS: serverUrl + '/orders',
  BACKEND_ODDER_DETAILS: serverUrl + '/orderDetails',
  BACKEND_USER_BIDS: serverUrl + '/myBids',
  BACKEND_USER_POSTED_PRODUCTS: serverUrl + '/myPostedProducts',
  BACKEND_PAYMENT_REMAINING: serverUrl + '/paymentRemaining',
  BACKEND_FEEDBACK: serverUrl + '/feedback',

  getProductDetail(productId: any): any {
    return this.BACKEND_PRODUCT + '/' + productId;
  },

  getDownlodImageUrl(imageId: any): any {
    return this.BACKEND_DOWNLOAD_IMAGE + '?imageId=' + imageId;
  },

  getUiProductSearchUrl(searchValue: any) {
    return this.PRODUCT_LISTING + '?searchValue=' + searchValue;
  },

  getBidOnProductUrl(productId: any) {
    return this.BACKEND_PRODUCT + '/' + productId + '/' + 'bid';
  },

  getOrderDetailsUrl(orderId: any) {
    return this.BACKEND_ODDER_DETAILS + '?orderId=' + orderId;
  },

  getRemoveProductUrl(productId: any) {
    return this.BACKEND_PRODUCT + '/' + productId;
  }
};
