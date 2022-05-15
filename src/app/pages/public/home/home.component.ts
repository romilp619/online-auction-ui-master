import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Product } from '../../../common/model/product.model';
import { ProductService } from '../../../common/product/product.service';
import { Pagination } from '../../../common/model/pagination.model';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 4, rows: 1, color: 'lightblue' },
    // {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    // {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    // {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'}
  ];


  startDate = '12/12/1999';
  startTime = '03:45:12';
  endDate = '13/12/1999';
  endTime = '03:45:45';


  myDate = new Date();
  today = Date.now();

  // this.startDate = new Date('this.startDate 11:26:16').getHours();
  // this.endDate = new Date('this.endDate 12:26:16').getHours();

  // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  pagination: Pagination;
  products: Product[];
  currentProduct: Product[];
  pastProduct: Product[];
  upcomingProduct: Product[];
  errorMessage: string;
  searchValue = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.errorMessage = '';
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['searchValue'];
    });
    console.log(this.searchValue);

    this.productService.getProducts(this.searchValue, true, true, true, null, 1,12).subscribe(data => {

      if (data.products && data.products instanceof Array && data.products.length > 0) {
        this.products = data.products;
        this.pagination = data.pagination;
      } else {
        this.errorMessage = 'No products posted by any user';
      }

      this.upcomingProduct = [];
      for (const product of this.products) {
        if (product.isUpcoming && this.upcomingProduct.length < 4) {
          this.upcomingProduct.push(product);
        }
      }

      this.currentProduct = [];
      for (const product of this.products) {
        if (product.isLive && this.currentProduct.length < 4) {
          this.currentProduct.push(product);
        }
      }

      this.pastProduct = [];
      for (const product of this.products) {
        if (product.isExpired && this.pastProduct.length < 4) {
          this.pastProduct.push(product);
        }
      }

    });
  }
}
