import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../common/auth/auth.service';
import { ResponseModel } from 'src/app/common/model/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  responseModel: ResponseModel;
  errorArray: string[];

  constructor(private authService: AuthenticationService) {

    this.username = localStorage.getItem('username');
    this.authService.isUserLoggedIn().subscribe(value => {
      if (value) {
        this.authService.redirectToHome();
      }
    });
  }

  ngOnInit() {
  }

  login() {

    this.errorArray = [];

    this.authService.authenticate(this.username, this.password)
      .subscribe((res: ResponseModel) => {
        this.responseModel = res;
        // console.log(this.responseModel);
        if (res.success) {
          if (localStorage.getItem('token')) {
            this.authService.redirectToHome();
          }
        } else if (!res.success) {
          this.errorArray = [];
          this.errorArray.push(res.message);
        }
      }, error => {
        this.errorArray = [];
        if (error.error) {
          this.errorArray = error.error.message.split('|');
        } else {
          this.errorArray.push(error.message);
        }
      });
  }

}
