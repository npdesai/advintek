import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { IpHistory } from 'src/app/ipam/models/ipHistory';

@Component({
  selector: 'app-ip-history',
  templateUrl: './ip-history.component.html',
  styleUrls: ['./ip-history.component.css']
})
export class IpHistoryComponent implements OnInit, AfterContentInit {
  @Input() ipHistories : IpHistory[];
  @Input() statusMessage : string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log(this.ipHistories);
  }

}
