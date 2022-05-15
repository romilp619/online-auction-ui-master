import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../../../common/product/product.service';
import {Product} from '../../../../common/model/product.model';
import {Pagination} from '../../../../common/model/pagination.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  pagination: Pagination;
  products: Product[];
  errorMessage = '';
  successMessage = '';

  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  displayedColumns: string[] = ['proId', 'proName', 'cateory', 'basePrice', 'startDate', 'endDate', 'deleteId', 'viewDetails'];

  ngOnInit() {

    this.errorMessage = '';
    this.successMessage = '';
    this.products = [];

    this.productService.getManageProducts().subscribe(data => {

      if (data.products && data.products instanceof Array && data.products.length > 0) {
        this.products = data.products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteProduct(productId: any) {
    this.errorMessage = '';
    this.successMessage = '';

    if (productId) {

      this.productService.removeProduct(productId).subscribe(data => {

        console.log(data.success);
        if (data.success) {
          this.successMessage = data.message
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        } else {
          this.errorMessage = data.message;
        }
      });
    }
  }
}


