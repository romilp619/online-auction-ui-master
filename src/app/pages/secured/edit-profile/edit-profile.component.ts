import { Component, OnInit } from '@angular/core';

export interface Course
{
  cid: number;
  cname: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor() { }
  C1: Course[] = [
    {cid : 1, cname : 'BCA'},
    {cid : 2, cname : 'MCA'},
    {cid : 3, cname : 'B.Com'}
  ]

  ngOnInit() {}
}
