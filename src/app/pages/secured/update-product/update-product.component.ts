import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from 'src/app/common/product/product.service';
import {Category} from 'src/app/common/model/category.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ResponseModel} from 'src/app/common/model/response.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../common/model/product.model';
import {APP_URL} from '../../../common/app-urls';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  images = [];
  firstImageData: string;
  firstImageId: any;
  product: Product;
  productId: number;

  urls = [];
  imageData = [];
  noOfImg: any = 0;
  maxImg: any = 10;
  files = [];
  selectedImageCount = 0;

  productName = '';
  productDescription = '';

  selectedCategory: any;

  startDate = '';
  endDate = '';
  startTime = '';
  endTime = '';
  price: any;

  responseModel: ResponseModel;
  errorArray: string[];
  successMessage: string;

  categories: any = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }

  // validationStartDate: any;
  // validationEndDate: any;
  todayDate: any = new Date().toJSON().split('T')[0];
  validationStartDate: any = this.todayDate;
  validationEndDate: any = this.validationStartDate;

  ngOnInit() {
    // this.todayDate = new Date().toJSON().split('T')[0];
    // this.validationStartDate = this.todayDate;
    // this.validationEndDate = this.validationStartDate;
    // this.validationEndDate.setDate( this.validationEndDate.getDate() + 2 );

    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.getCategories();

  }

  endDateValidate() {
    this.validationEndDate.setDate(this.validationEndDate + 2);

    // this.validationEndDate.add(this.validationEndDate, 2);
  }

  onFileChanged(event: any) {
    const file = event.target.files.item(0);

    this.noOfImg = event.target.files.length;
    this.files = event.target.files;

    if (this.noOfImg <= this.maxImg) {
      for (let i = 0; i < this.noOfImg; i++) {
        if (event.target.files && event.target.files[i]
          && event.target.files[i].type.match('image.*') && event.target.files[i].size < 512000) {
          this.selectedImageCount++;
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[i]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.urls.push((event.target as FileReader).result);
          };
        } else {
          alert('Please select image only and each image size must not exceeds 500 KB');
          this.selectedImageCount = 0;
        }
      }
    }
  }

  getCategories() {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;

      this.getProductDetail(this.productId);
    });

    //  this.categories.push({ id: 1, name: 'hhhd', description: 'dgdfdfdf' });
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
  }

  startDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value.toLocaleDateString();
  }

  endDateChange(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value.toLocaleDateString();
  }

  getPrice(event: any) {
    this.price = event.value;
  }

  updateProduct() {

    // this.endDateValidate();

    this.successMessage = '';
    this.errorArray = [];

    this.productService.updateProduct(this.productId, this.files, this.productName, this.productDescription, this.selectedCategory,
      this.startDate, this.startTime, this.endDate, this.endTime, this.price).subscribe((res: ResponseModel) => {
      this.responseModel = res;
      if (res.success) {
        this.successMessage = res.message;
      } else if (!res.success) {
        this.successMessage = null;
        this.errorArray.push(res.message);
      }
    }, error => {
      console.log(error);
      this.errorArray = [];
      if (error.error) {
        this.errorArray = error.error.message.split('|');
      } else {
        this.errorArray.push(error.message);
      }
    });
  }


  // todayNumber: number;
  // todayDate: Date;
  // todayString: string;
  // todayISOString: string;
  // today: number;
  // date: number;
  // msg: any = 'hello';
  // startDateTime() {
  //   // this.todayNumber = Date.now();
  //   // this.todayDate = new Date();
  //   // this.todayString = new Date().toDateString();
  //   // this.todayISOString = new Date().toISOString();
  //   this.today = Date.now();

  //   if ( this.today >  this.date) {
  //     this.msg = 'Wrong date';
  //   }
  // }


  getProductDetail(productId: any) {

    this.productService.getProductDetail(productId).subscribe(data => {

      this.urls = [];

      this.product = data;

      if (data.otherImagesId) {
        this.images = [];
        for (const imgId of data.otherImagesId) {
          this.images.push(APP_URL.getDownlodImageUrl(imgId));
        }
      }

      if (data.imageDataList) {
        let i = 0;
        for (const imgData of data.imageDataList) {
          if (i === 0) {
            this.firstImageData = imgData;
            this.firstImageId = 'img-' + 1;
          }

          this.urls.push(imgData);
          this.selectedImageCount = i + 1;

          i++;
        }
      }


      this.productName = this.product.name;
      this.productId = this.product.id;
      this.productDescription = this.product.description;
      this.endDate = this.product.endDate;
      this.endTime = this.product.endTime;
      this.startTime = this.product.startTime;
      this.startDate = this.product.startDate;
      this.price = this.product.price;

      for (const cat of this.categories) {
        if (this.product.categoryName && this.product.categoryName === cat.name) {
          this.selectedCategory = cat.id;
          break;
        }
      }

    });
  }

}
