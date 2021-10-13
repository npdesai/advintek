import { Component, OnInit, ViewChild } from '@angular/core';
import { IpDetail } from '../../models/ipDetail';
import { IpHistory } from '../../models/ipHistory';
import { Subnet } from '../../models/subnet';
import { SubnetService } from '../../services/subnet.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  subnets: Subnet[] = [];
  ipDetails: IpDetail[] = [];
  ipHistories: IpHistory[] = [];
  statusMessage: string = "";

  constructor(private subnetService: SubnetService) { }

  ngOnInit(): void {
    this.getSubnetData();
    this.getIpDetails();
    this.getIpHistories();
  }

  getSubnetData() {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnets(4).then((data) => {
      this.subnets = data;
    });
  }

  getIpDetails() {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetIps("49.256.25.0").subscribe((data) => {
      this.ipDetails = data;
    })
  }

  getIpHistories() {
    this.statusMessage = "Loading data...";
    this.subnetService.getIpHistories(4).then((data) => {
      this.ipHistories = data;
    })
  }
}
