import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../../../common/product/product.service';
import {Category} from '../../../../common/model/category.model';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this.productService.getCategories()
      .subscribe(data => {
        if (data && data.length > 0) {
          this.categories = data;
        }
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
      });
  }
}


