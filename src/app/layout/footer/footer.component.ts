import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public message : any;

  constructor() { }

  ngOnInit() {
  }

  print(){
    this.message = "print me button clicked";
  }

}
