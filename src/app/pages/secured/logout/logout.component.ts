import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLoggedOut = false;
  message = 'You are about to logged out!';

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    console.log('logout component');
    this.authService.logOut();
    this.isLoggedOut = true;
    this.message = 'User logged out successfully.';
  }

  logout() {
    console.log('logout component');
    this.authService.logOut();
    this.isLoggedOut = true;
    this.message = 'User logged out successfully.';
  }

  redirectToHome() {
    this.authService.redirectToHome();
  }

  redirectToLogin() {
    this.authService.redirectToLogin();
  }
}
