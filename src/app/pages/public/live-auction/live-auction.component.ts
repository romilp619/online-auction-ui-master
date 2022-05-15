import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserBid} from '../../../common/model/user.bid.model';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit {


  @Input()
  userBids: UserBid[];

  displayedColumns = ['id', 'username', 'name', 'bidPrice', 'bidDateTime'];
  dataSource: MatTableDataSource<UserBid>;

  constructor() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userBids);
  }

}


