import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  npwdhide = true;
  vpwdhide = true;
  constructor() { }

  ngOnInit() {
  }
  match(newpwd: any, verifypwd: any){
    // if(newpwd == verifypwd)
    // {
    //   print("Password is matched");
    // }
  }

}
