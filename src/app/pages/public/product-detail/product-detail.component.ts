import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/common/model/product.model';
import {ProductService} from 'src/app/common/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APP_URL} from 'src/app/common/app-urls';
import {UserBid} from '../../../common/model/user.bid.model';
import {UserWinBid} from '../../../common/model/user.win.bid.model';

class ImageIdDetail {
  id: string;
  imageData: string;
}


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  productId: any;

  images = [];
  firstImageData: string;
  // otherImagesData = [];

  otherIdImagesData: ImageIdDetail[];

  firstImageId: any;
  // otherImagesId = [];
  productStatus = '';

  isOwner = false;
  bidAmount: any;

  bidSuccessMessage: any;
  bidErrorMessage: any;

  cartSuccessMessage: any;
  cartErrorMessage: any;

  isUserLogged = false;

  userBids: UserBid[];

  userWinBid: UserWinBid;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && token != null) {
      this.isUserLogged = true;
    }

    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    console.log(this.productId);
    this.getProductDetail(this.productId);
  }

  getProductDetail(productId: any) {
    this.userBids = [];

    this.productService.getProductDetail(productId).subscribe(data => {

      this.product = data;
      if (this.product.userWinBid) {
        this.userWinBid = this.product.userWinBid;
      }

      console.log(this.product);

      if (this.product.ownerUsername && this.product.ownerUsername === localStorage.getItem('username')) {
        this.isOwner = true;
      }

      if (this.product.isExpired) {
        this.productStatus = 'EXPIRED';
      } else if (this.product.isUpcoming) {
        this.productStatus = 'UPCOMING';
      } else {
        this.productStatus = 'LIVE';
      }

      if (data.otherImagesId) {
        this.images = [];
        for (const imgId of data.otherImagesId) {
          this.images.push(APP_URL.getDownlodImageUrl(imgId));
        }
      }

      if (data.imageDataList) {
        // this.otherImagesData = [];
        // this.otherImagesId = [];
        this.otherIdImagesData = [];

        let i = 0;
        for (const imgData of data.imageDataList) {
          if (i === 0) {
            this.firstImageData = imgData;
            this.firstImageId = 'img-' + 1;
          } else {
            // this.otherImagesData.push(imgData);
            // this.otherImagesId.push('img-' + i);

            const o = new ImageIdDetail();
            o.id = 'img-' + (i + 1);
            o.imageData = imgData;

            this.otherIdImagesData.push(o);
          }
          i++;
        }
      }

      if (data.userBiddingDetails) {
        this.userBids = data.userBiddingDetails;
      }

    });
  }

  bid(productId: any) {

    console.log(productId);

    this.bidSuccessMessage = '';
    this.bidErrorMessage = '';

    if (productId && this.bidAmount) {
      this.productService.bidOnProduct(productId, this.bidAmount).subscribe(data => {

        console.log(data);
        if (data.success) {
          this.bidSuccessMessage = data.message;
        } else {
          this.bidErrorMessage = 'User bidding was not successful';
        }
      });
    }
  }


  addToCart(productId: any) {

    console.log(productId);

    this.cartErrorMessage = '';
    this.cartSuccessMessage = '';

    if (productId) {
      this.productService.addToCart(productId).subscribe(data => {

        console.log(data);
        if (data.success) {
          this.cartSuccessMessage = data.message;
          this.router.navigateByUrl(APP_URL.CART);
        } else {
          this.cartErrorMessage = 'User bidding was not successful';
        }
      });
    }
  }


  refreshPage() {
    console.log('refreshPage');
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

}
