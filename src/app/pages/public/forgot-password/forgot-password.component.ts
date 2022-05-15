import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  username: any;
  successMsg: any;
  errorMsg: any;
  response: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  resetPassword() {

    this.response = '';
    this.successMsg = '';
    this.errorMsg = '';

    if (this.username) {

      this.userService.resetPassword(this.username)
        .subscribe(apiResponse => {
          console.log(apiResponse.success);

          if (apiResponse.success) {
            this.successMsg = apiResponse.message;
            this.response = apiResponse.data;
          } else {
            this.errorMsg = apiResponse.message;
            if (apiResponse.data) {
              this.errorMsg = apiResponse.data;
            }
          }
        }, error => {
          if (error.error) {
            this.errorMsg = error.error.message;
          } else {
            this.errorMsg = 'Change password failed';
          }
        });
    }
  }
}
