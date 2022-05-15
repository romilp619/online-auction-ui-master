import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../common/auth/auth.service';
import { ResponseModel } from 'src/app/common/model/response.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  chide = true;

  username: string = null;
  email: string = null;
  password: string = null;
  confirmPassword: string = null;

  responseModel: ResponseModel;
  errorArray: string[];
  successMessage: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {

    this.successMessage = '';
    this.errorArray = [];

    this.authService.register(this.username, this.email, this.password, this.confirmPassword)
      .subscribe((res: ResponseModel) => {
        this.responseModel = res;
        // console.log(this.responseModel);
        if (res.success) {
            // this.authService.redirectToLogin();
            this.successMessage = res.message;
            this.errorArray = null;
            this.username = null;
            this.email = null;
            this.password = null;
            this.confirmPassword = null;
        } else if (!res.success) {
          this.successMessage = null;
          this.errorArray = res.message.split('|');
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

}
