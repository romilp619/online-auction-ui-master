import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../common/product/product.service';
import {CartProduct} from '../../../common/model/cart.product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: CartProduct[];

  username: any;

  errorMessage: any;

  subTotal = 0;
  total = 0;
  shippingCharge = 0;

  cartSuccessMessage: any;
  cartErrorMessage: any;

  constructor(private productService: ProductService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getCartProducts();
  }

  getCartProducts() {
    this.errorMessage = '';
    this.subTotal = 0;
    this.total = 0;
    this.shippingCharge = 0;


    this.productService.getCartProducts().subscribe(response => {

      if (response.success && response.data && response.data instanceof Array && response.data.length > 0) {
        this.cartProducts = response.data;

        for (const product of this.cartProducts) {
          this.subTotal = this.subTotal + product.totalPrice;
        }
        this.total = this.subTotal;
      } else {
        this.errorMessage = 'Cart is empty';
      }
    });
  }

  removeFromCart(productId: any) {

    console.log(productId);

    this.cartErrorMessage = '';
    this.cartSuccessMessage = '';

    if (productId) {
      this.productService.removeFromCart(productId).subscribe(data => {

        console.log(data);
        if (data.success) {
          this.cartSuccessMessage = data.message;
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        } else {
          this.cartErrorMessage = 'Product removing from cart failed.';
        }
      });
    }
  }

}
