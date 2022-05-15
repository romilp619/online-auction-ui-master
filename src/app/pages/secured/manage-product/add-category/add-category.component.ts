import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from 'src/app/common/product/product.service';
import {Category} from 'src/app/common/model/category.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ResponseModel} from 'src/app/common/model/response.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  categoryName = '';
  categoryDescription = '';

  responseModel: ResponseModel;
  errorMessage: string;
  successMessage: string;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
  }

  addCategory() {

    this.successMessage = '';
    this.errorMessage = '';

    this.productService.addCategory(this.categoryName, this.categoryDescription).subscribe((res: ResponseModel) => {
      this.responseModel = res;
      if (this.responseModel.success) {
        this.successMessage = 'Category added succesfully';
      } else {
        this.errorMessage = 'Unable to add category';
      }
    }, error => {
      console.log(error);
      this.errorMessage = 'Unable to add category';
    });
  }
}
