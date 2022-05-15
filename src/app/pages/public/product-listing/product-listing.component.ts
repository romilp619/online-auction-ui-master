import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Product} from '../../../common/model/product.model';
import {ProductService} from '../../../common/product/product.service';
import {Pagination} from '../../../common/model/pagination.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
  providers: [DatePipe]
})
export class ProductListingComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  ];

  categories = [];
  selectedCategories = [];

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;


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
  errorMessage: string;
  searchValue = '';

  isLive = true;
  isExpired = true;
  isUpcoming = true;

  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  public productList: Product[] = [];
  public paginationList: Product[] = [];

  ngOnInit() {

    this.pageIndex = 0;
    this.pageSize = 5;

    this.errorMessage = '';
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['searchValue'];
    });
    console.log(this.searchValue);

    this.getCategories();
    this.getProducts();

    // this.productList = product;


    // this.activatedRoute.params.subscribe((param: any) => {
    //   this.catalogService.getProductList(this.searchValue, true, true, true)
    //     .do((product: any) => {
    //       this.productList = product;
    //     })
    //     .subscribe();
    // });

  }

  getProducts() {

    this.productService.getProducts(this.searchValue, this.isExpired, this.isLive, this.isUpcoming, this.selectedCategories, this.pageIndex + 1, this.pageSize)
      .subscribe(data => {

        if (data.products && data.products instanceof Array && data.products.length > 0) {
          this.products = data.products;
          this.productList = data.productList;
          this.pagination = data.pagination;
          this.paginationList = data.paginationList;
          this.errorMessage = '';
        } else {
          this.products = [];
          this.productList = [];
          this.pagination = null;
          this.paginationList = [];
          this.errorMessage = 'No products posted by any user';
        }
      });
  }

  getCategories() {
    this.categories = [];
    this.productService.getCategories().subscribe(data => {

      this.categories = data;
      /*for (const cat of data) {
        this.categories.push(cat.name);
      }*/
    });
  }

  onNgModelChange($event) {
    console.log($event);
    this.selectedCategories = $event;
  }

  resetCategory() {
    this.selectedCategories = [];
    this.getProducts();
  }

  isLiveStatus(liveValue) {
    this.isLive = !liveValue;
    this.getProducts();
  }

  isExpiredStatus(exValue) {
    this.isExpired = !exValue;
    this.getProducts();
  }

  isUpcomingStatus(upValue) {
    this.isUpcoming = !upValue;
    this.getProducts();
  }


  public applyPagination(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }
}
