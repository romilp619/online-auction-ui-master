import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../common/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  address: string;
  city: string;
  contactNo: number;
  contactPerson: string;
  country: string;
  email: string;
  pincode: number;
  state: string;
  productId: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
    });
    console.log(this.productId);
  }


  payment() {
    if (this.productId && this.productId > 0) {
      this.payRemainingPrice();
    } else {
      this.cartPayment();
    }
  }

  cartPayment() {
    this.productService.payment(this.contactPerson, this.contactNo, this.email, this.address, this.city,
      this.pincode, this.state, this.country);
    /*.subscribe(response => {
          console.log(response);
        });*/
  }

  payRemainingPrice() {
    this.productService.paymentRemaining(this.productId, this.contactPerson, this.contactNo, this.email, this.address, this.city,
      this.pincode, this.state, this.country);
  }

}
