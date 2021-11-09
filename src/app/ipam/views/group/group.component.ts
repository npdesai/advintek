import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router, Routes } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { IpDetail } from '../../models/ipDetail';
import { IpHistory } from '../../models/ipHistory';
import { AddIpv4Subnet, SubnetGroupDetail } from '../../models/subnet';
import { SubnetService } from '../../services/subnet.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  subnets: SubnetGroupDetail[] = [];
  ipDetails: IpDetail[] = [];
  ipHistories: IpHistory[] = [];
  statusMessage: string = "";
  subnetGroupId: string = "";
  updateSubnetWidth = 0;
  selectedSubnet: AddIpv4Subnet = new AddIpv4Subnet();
  isSubnetSelected: boolean = false;

  constructor(private subnetService: SubnetService, private router: Router, private route: ActivatedRoute, private primeNgConfig: PrimeNGConfig) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getSubnetData(params.get('Id'));
      this.getIpHistories(params.get('Id'));
      this.getIpDetails(params.get('Id')); 
    });       
  }

  getSubnetData(id: string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnets(id).subscribe((data) => {
      if(data) {
        this.subnets = data;
      }
    })
  }

  editSubnetHandler() {
    if(this.isSubnetSelected === false) {
      alert("Please select Subnet")
      return;
    }
    this.updateSubnetWidth = 100;
  }

  getIpDetails(subnetId: string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetIps(subnetId).subscribe((data) => {
      this.ipDetails = data;
    })
  }

  getIpHistories(subnetId: string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getIpHistories(subnetId).subscribe((data) => {
      this.ipHistories = data;
    })
  }

  closeDiv(width) {
    this.updateSubnetWidth = width;
  }

  selectSubnetHandler(subnet) {
    this.isSubnetSelected = true;    
    this.getSubnetDetail(subnet.subnetId);
  }

  getSubnetDetail(subnetId:string) {
    this.subnetService.getSubnetDetail(subnetId).subscribe((data) => {
      if(data) {
        this.selectedSubnet = data;
      }
    })
  }
}
