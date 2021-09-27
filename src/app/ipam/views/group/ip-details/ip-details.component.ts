import { Component, Input, OnInit } from '@angular/core';
import { IpDetail } from 'src/app/ipam/models/ipDetail';

@Component({
  selector: 'app-ip-details',
  templateUrl: './ip-details.component.html',
  styleUrls: ['./ip-details.component.css']
})
export class IpDetailsComponent implements OnInit {
  @Input() ipDetails: IpDetail[];
  @Input() statusMessage : string;

  constructor() { }

  ngOnInit(): void {
  }

}
