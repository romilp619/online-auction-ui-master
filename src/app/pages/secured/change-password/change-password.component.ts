import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  verifyhide = true;
  oldhide = true;
  newhide = true;

  currentPassword: any;
  newPassword: any;
  confirmPassword: any;
  username: any;

  successMsg: any;
  errorMsg: any;
  response: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

  }

  changePassword() {

    this.username = localStorage.getItem('username');

    this.response = '';
    this.successMsg = '';
    this.errorMsg = '';

    if (this.username) {

      this.userService.changePassword(this.username, this.currentPassword, this.newPassword, this.confirmPassword)
        .subscribe(apiResponse => {
          console.log(apiResponse.success);

          if (apiResponse.success) {
            this.successMsg = apiResponse.message;
            this.response = apiResponse.data;
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
