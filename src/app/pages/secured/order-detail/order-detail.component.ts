import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../common/product/product.service';
import {CartProduct} from '../../../common/model/cart.product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../common/user/user.service';
import {Order} from '../../../common/model/order.model';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  paymentMethod = 'Paytem';
  bankName = 'ICICI';
  currency = 'Rupees';

  contactPerson = 'Deepak';
  contactNumber = '9885568899';
  emailId = 'deepakb3080@gmail.com';
  address = 'Kismat Nagar, Kubernagar, Ahmedabad - 382340';

  date: any = '21/10/2020';

  orderProducts: CartProduct[];

  username: any;

  errorMessage: any;

  subTotal = 0;
  total = 0;
  shippingCharge = 0;

  orderId: any;
  order: Order;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
    });
    console.log(this.orderId);

    this.getProductDetail(this.orderId);
  }

  getProductDetail(orderId: any) {
    this.userService.getOrderDetails(orderId).subscribe(data => {

      this.order = data;
      this.orderProducts = data.products;

    });
  }

}
