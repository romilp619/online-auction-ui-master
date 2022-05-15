import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user/user.service';
import {Order} from '../../../common/model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  searchValue = '';
  orders: Order[];

  errorMessage: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getOrders(this.searchValue).subscribe(data => {

      if (data && data instanceof Array && data.length > 0) {
        this.orders = data;
      } else {
        this.errorMessage = 'No orders placed yet';
      }
    });

  }

  getOrders() {

    this.userService.getOrders(this.searchValue).subscribe(data => {

      if (data && data instanceof Array && data.length > 0) {
        this.orders = data;
      } else {
        this.errorMessage = 'No orders placed yet';
      }
    });
  }

}
