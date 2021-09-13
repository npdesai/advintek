import { Component, OnInit } from '@angular/core';
import { DHCPSummary } from 'src/app/ipam/models/DHCPSumary';
import { DHCPserviceService } from 'src/app/ipam/services/dhcpservice.service';

@Component({
  selector: 'app-dhcp-summary',
  templateUrl: './dhcp-summary.component.html',
  styleUrls: ['./dhcp-summary.component.css'],
})
export class DHCPSummaryComponent implements OnInit {
  statusMessage: string = '';
  dhcpServers: DHCPSummary[] = [];

  constructor(private dHCPserviceService: DHCPserviceService) {}

  ngOnInit(): void {
    this.getDHCPSummaryData();
  }

  getDHCPSummaryData() {
    this.statusMessage = 'Loading data...';
    this.dHCPserviceService.getDHCPSummary(4).then((data) => {
      this.dhcpServers = data;
    });
  }
}
