import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  is_edit = true;
  show = false;

  role = '';
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  phoneno = '';
  gender = '';
  address = '';
  createdate = '';
  postedProduct = 0;
  purchasedProduct = 0;
  bio = '';
  // fullname = '';
  totalBids = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*this.role = "Seller or Bidder";
    this.username = "mahesh";
    this.firstName = "Maheshkumar";
    this.lastName = "Savita";
    this.email = "maheshkumarb2612@gmail.com";
    this.phoneno = 9724462436;
    this.gender = "Male";
    this.address = "Address";
    this.createdate = "12-06-2019";
    this.postproduct = 5;
    this.purchasedProduct = 9;
    this.bio = "TYBCA Project";
    this.fullname = this.firstname + " " + this.lastname;*/

    this.userService.getProfile().subscribe(apiResponse => {

      if (apiResponse.data.firstName && apiResponse.data.firstName != null) {
        this.firstName = apiResponse.data.firstName;
      }
      if (apiResponse.data.lastName && apiResponse.data.lastName != null) {
        this.lastName = apiResponse.data.lastName;
      }
      if (apiResponse.data.gender && apiResponse.data.gender != null) {
        this.gender = apiResponse.data.gender;
      }
      if (apiResponse.data.email && apiResponse.data.email != null) {
        this.email = apiResponse.data.email;
      }
      if (apiResponse.data.username && apiResponse.data.username != null) {
        this.username = apiResponse.data.username;
      }
      if (apiResponse.data.address && apiResponse.data.address != null) {
        this.address = apiResponse.data.address;
      }
      if (apiResponse.data.accountCreatedOn && apiResponse.data.accountCreatedOn != null) {
        this.createdate = apiResponse.data.accountCreatedOn;
      }
      if (apiResponse.data.totalPurchasedProducts && apiResponse.data.totalPurchasedProducts != null) {
        this.purchasedProduct = apiResponse.data.totalPurchasedProducts;
      }
      if (apiResponse.data.totalPostedProducts && apiResponse.data.totalPostedProducts != null) {
        this.postedProduct = apiResponse.data.totalPostedProducts;
      }
      if (apiResponse.data.bio && apiResponse.data.bio != null) {
        this.bio = apiResponse.data.bio;
      }
      if (apiResponse.data.totalBids && apiResponse.data.totalBids != null) {
        this.totalBids = apiResponse.data.totalBids;
      }
      if (apiResponse.data.contact && apiResponse.data.contact != null) {
        this.phoneno = apiResponse.data.contact;
      }
      // this.fullname = this.firstName + ' ' + this.lastName;

    });

  }

  updateProfile() {
    this.userService.updateProfile(this.firstName, this.lastName, this.phoneno, this.gender, this.address, this.bio)
      .subscribe(apiResponse => {
        console.log(apiResponse);
      });
  }

}
