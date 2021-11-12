import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SubnetIPDetail } from 'src/app/ipam/models/subnet';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { SubnetService } from 'src/app/ipam/services/subnet.service';

@Component({
  selector: 'app-subnet-ip-detail',
  templateUrl: './subnet-ip-detail.component.html',
  styleUrls: ['./subnet-ip-detail.component.css']
})
export class SubnetIpDetailComponent implements OnInit {
  subnetIpDetail: SubnetIPDetail = new SubnetIPDetail();

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private subnetService: SubnetService, 
    private loaderService: LoadingDataService
    ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getSubnetIpDetail(params.get('Id'));
    });
  }

  getSubnetIpDetail(subnetIpId) {
    this.loaderService.showLoader();
    this.subnetService.getSubnetIpDetail(subnetIpId).subscribe((data) => {
      if(data) {
        console.log(data);
        this.subnetIpDetail = data;
        this.loaderService.hideLoader();
      }
    })
  }

}
