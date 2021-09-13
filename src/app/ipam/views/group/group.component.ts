import { Component, OnInit } from '@angular/core';
import { Subnet } from '../../models/subnet';
import { SubnetService } from '../../services/subnet.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  subnets: Subnet[] = [];
  statusMessage: string = "";

  constructor(private subnetService: SubnetService) { }

  ngOnInit(): void {
    this.getSubnetData();
  }

  getSubnetData() {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnets(4).then((data) => {
      this.subnets = data;
    });
  }
}
