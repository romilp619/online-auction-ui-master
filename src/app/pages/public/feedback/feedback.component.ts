import {Component, OnInit} from '@angular/core';
import {ResponseModel} from '../../../common/model/response.model';
import {UserService} from '../../../common/user/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  ngOnInit() {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  name = '';
  contact = '';
  email = '';
  subject = '';
  message = '';

  responseModel: ResponseModel;
  errorMessage: string;
  successMessage: string;

  constructor(private userService: UserService) {

  }

  sendFeedback() {

    this.successMessage = '';
    this.errorMessage = '';

    this.userService.sendFeedback(this.name, this.contact, this.email, this.subject, this.message).subscribe((res: ResponseModel) => {
      this.responseModel = res;
      if (this.responseModel.success) {
        this.successMessage = 'Feedback sent successfully';

        this.name = '';
        this.contact = '';
        this.email = '';
        this.subject = '';
        this.message = '';

      } else {
        this.errorMessage = 'Unable to send feedback';
      }
    }, error => {
      console.log(error);
      this.errorMessage = error.error.message ? error.error.message : 'Unable to send feedback';

    });
  }

}
