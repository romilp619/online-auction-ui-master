import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APP_URL } from '../app-urls';
import { ResponseModel } from '../model/response.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  authenticate(username, password) {
    localStorage.setItem('username', username);
    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_LOGIN, { username, password })
      .pipe(
        map(
          userData => {
            localStorage.setItem('username', username);
            let tokenStr = 'Bearer ' + userData.data.token;
            localStorage.setItem('token', tokenStr);
            this.isLoggedIn.next(true);

            if(userData.data.role) {
              localStorage.setItem('role', userData.data.role);
            }
            if(userData.data.isAdmin) {
              localStorage.setItem('isAdmin', userData.data.isAdmin);
            }
            return userData;
          }
        )
      );
  }
  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token && token != null) {
      // console.log(!(user === null))
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn;
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isAdmin');
    this.isLoggedIn.next(false);
  }

  redirectToHome() {
    this.router.navigateByUrl(APP_URL.HOME);
  }

  redirectToHost() {
    this.router.navigateByUrl(APP_URL.HOST);
  }

  redirectToLogin() {
    this.router.navigateByUrl(APP_URL.LOGIN);
  }

  register(username, email, password, confirmPassword) {

    return this.httpClient.post<ResponseModel>(APP_URL.BACKEND_REGISTER, { username, email, password, confirmPassword })
      .pipe(
        map(
          userData => {
            console.log(userData);
            return userData;
          }
        )
      );
  }

}
