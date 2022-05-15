import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {UserPostedProduct} from '../../../common/model/user.posted.product.model';
import {UserService} from '../../../common/user/user.service';


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  userPostedProducts: UserPostedProduct[];

  displayedColumns: string[] = ['productId', 'productName', 'categoryName', 'productStartDateTime', 'productEndDateTime',
    'productStatus', 'basePrice', 'viewDetails'];

  dataSource: MatTableDataSource<UserPostedProduct>;

  totalUserPostedProducts = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getUserPostedProducts();
  }

  getUserPostedProducts() {
    this.userService.getUserPostedProducts().subscribe(data => {

      this.userPostedProducts = data;
      this.totalUserPostedProducts = this.userPostedProducts.length;
      this.dataSource = new MatTableDataSource(this.userPostedProducts);
      // this.dataSource.paginator = this.paginator;

    });
  }

  refreshPage() {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }
}
