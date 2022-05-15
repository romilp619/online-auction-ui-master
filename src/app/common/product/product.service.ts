import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../model/response.model';
import {APP_URL} from '../app-urls';
import {map} from 'rxjs/operators';
import {Category} from '../model/category.model';
import {Payment} from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categories: Category[];

  paymentModel: Payment;

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): any {

    return this.httpClient.get<ResponseModel>(APP_URL.BACKEND_CATEGORY)
      .pipe(
        map(
          apiResponse => {
            console.log(apiResponse);
            if (apiResponse.data) {
              return apiResponse.data;
            } else {
              return apiResponse;
            }
          }
        )
      );
  }

  postProduct(images: any, name: any, description: any, categoryId: any,
              startDate: any, startTime: any, endDate: any, endTime: any, price: any): any {

    const productDetail = {name, description, categoryId, startDate, startTime, endDate, endTime, price};

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(productDetail));

    for (const img of images) {
      formData.append('images', img, img.name);
    }

    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_PRODUCT, formData).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }

  getProductDetail(productId: any): any {

    return this.httpClient.get<ResponseModel>(APP_URL.getProductDetail(productId))
      .pipe(
        map(
          apiResponse => {
            console.log(apiResponse.success);
            if (apiResponse.data) {
              return apiResponse.data;
            } else {
              return apiResponse;
            }
          }
        )
      );
  }

  getProducts(searchValue: any, expired: boolean, live: boolean, upcoming: boolean, categories: any, pageNum: any, pageSize: any): any {

    let url = APP_URL.BACKEND_PRODUCT;
    if (searchValue) {
      url = url + '?searchValue=' + searchValue + '&sortBy=startDateTime&sortOrder=desc';
    } else {
      url = url + '?sortBy=startDateTime&sortOrder=desc';
    }

    if (pageNum && pageSize) {
      url = url + '&pageNum=' + pageNum + '&pageSize=' + pageSize;
    }

    if (categories && categories.length > 0) {
      url = url + '&categoryIds=' + categories;
    }

    url = url + '&isLive=' + live + '&isExpired=' + expired + '&isUpcoming=' + upcoming;

    return this.httpClient.get<ResponseModel>(url)
      .pipe(
        map(
          apiResponse => {
            console.log(apiResponse.success);
            if (apiResponse.data) {
              return apiResponse.data;
            } else {
              return apiResponse;
            }
          }
        )
      );
  }

  bidOnProduct(productId: any, bidPrice: any) {

    const bidReq = {productId, bidPrice};
    const url = APP_URL.getBidOnProductUrl(productId);
    return this.httpClient.post<ResponseModel>(url, bidReq).pipe(
      map(
        apiResponse => {
          console.log(apiResponse);
          return apiResponse;
        }
      )
    );
  }

  addToCart(productId: any) {

    const productIds = [productId];
    const cartRequest = {productIds};
    const url = APP_URL.BACKEND_ADD_TO_CART;

    return this.httpClient.post<ResponseModel>(url, cartRequest).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }


  getCartProducts(): any {

    const url = APP_URL.BACKEND_CART_PRODUCTS;

    return this.httpClient.get<ResponseModel>(url);
  }

  payment(contactPerson: any, contactNo: any, email: any, address: any, city: any, pincode: any, state: any, country: any) {

    const detail = {contactPerson, contactNo, email, address, city, pincode, state, country};
    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_PAYMENT, detail).subscribe(res => {

      console.log(res);
      // this.paymentModel = res;

      /*let url = this.paymentModel.PAYMENT_URL;
      url = url + '?';
      url = url + 'CALLBACK_URL=' + this.paymentModel.CALLBACK_URL;
      url = url + '&' + 'CHANNEL_ID=' + this.paymentModel.CHANNEL_ID;
      url = url + '&' + 'CHECKSUMHASH=' + this.paymentModel.CHECKSUMHASH;
      url = url + '&' + 'CUST_ID=' + this.paymentModel.CUST_ID;
      url = url + '&' + 'EMAIL=' + this.paymentModel.EMAIL;
      url = url + '&' + 'INDUSTRY_TYPE_ID=' + this.paymentModel.INDUSTRY_TYPE_ID;
      url = url + '&' + 'MID=' + this.paymentModel.MID;
      url = url + '&' + 'MOBILE_NO=' + this.paymentModel.MOBILE_NO;
      url = url + '&' + 'ORDER_ID=' + this.paymentModel.ORDER_ID;
      url = url + '&' + 'PAYMENT_URL=' + this.paymentModel.PAYMENT_URL;
      url = url + '&' + 'TXN_AMOUNT=' + this.paymentModel.TXN_AMOUNT;
      url = url + '&' + 'WEBSITE=' + this.paymentModel.WEBSITE;

      console.log(url);*/

      window.location.href = res.data;

    });

    /*.pipe(
    map(
      apiResponse => {
        console.log(apiResponse);
        return apiResponse;
      }
    )
  );*/
  }


  removeFromCart(productId: any) {

    const productIds = [productId];
    const cartRequest = {productIds};
    const url = APP_URL.BACKEND_REMOVE_FROM_CART;

    return this.httpClient.put<ResponseModel>(url, cartRequest).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }


  addCategory(name: any, description: any) {
    const categoryDetail = {name, description};

    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_CATEGORY, categoryDetail).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }

  getManageProducts(): any {

    const url = APP_URL.BACKEND_PRODUCT + '?needImage=false';

    return this.httpClient.get<ResponseModel>(url)
      .pipe(
        map(
          apiResponse => {
            console.log(apiResponse.success);
            if (apiResponse.data) {
              return apiResponse.data;
            } else {
              return apiResponse;
            }
          }
        )
      );
  }


  removeProduct(productId: any) {

    const url = APP_URL.getRemoveProductUrl(productId);

    return this.httpClient.delete<ResponseModel>(url).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }

  paymentRemaining(productId: any, contactPerson: any, contactNo: any, email: any, address: any, city: any,
                   pincode: any, state: any, country: any) {

    const detail = {productId, contactPerson, contactNo, email, address, city, pincode, state, country};
    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_PAYMENT_REMAINING, detail).subscribe(res => {

      window.location.href = res.data;

    });
  }


  updateProduct(productId: any, images: any, name: any, description: any, categoryId: any,
                startDate: any, startTime: any, endDate: any, endTime: any, price: any): any {

    const productDetail = {name, description, categoryId, startDate, startTime, endDate, endTime, price};

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(productDetail));

    for (const img of images) {
      formData.append('images', img, img.name);
    }

    return this.httpClient.put<ResponseModel>(APP_URL.getProductDetail(productId), formData).pipe(
      map(
        apiResponse => {
          console.log(apiResponse.success);
          return apiResponse;
        }
      )
    );
  }
}
