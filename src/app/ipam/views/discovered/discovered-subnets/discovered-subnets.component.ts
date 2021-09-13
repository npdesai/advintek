import { Component, OnInit } from '@angular/core';
import { DiscoveredSubnets } from 'src/app/ipam/models/DiscoveredSubnets';
import { DiscoveredSubnetsService } from 'src/app/ipam/services/discovered-subnets.service';

@Component({
  selector: 'app-discovered-subnets',
  templateUrl: './discovered-subnets.component.html',
  styleUrls: ['./discovered-subnets.component.css']
})
export class DiscoveredSubnetsComponent implements OnInit {
  statusMessage: string = '';
  discoveredSubnets: DiscoveredSubnets[] = [];

  constructor(private discoveredSubnetsService : DiscoveredSubnetsService) { }

  ngOnInit(): void {
    this.getDiscoveredSubnetsData();
  }

  getDiscoveredSubnetsData() {
    this.statusMessage = 'Loading Data...';
    this.discoveredSubnetsService.getDiscoveredSubnets(4).then((data) => {
      this.discoveredSubnets = data;
    })
  }

}
