import { Component, OnInit } from '@angular/core';
import { DHCPScope } from 'src/app/ipam/models/DHCPScope';
import { DHCPSummary } from 'src/app/ipam/models/DHCPSumary';
import { DHCPserviceService } from 'src/app/ipam/services/dhcpservice.service';

@Component({
  selector: 'app-dhcp-server-detail',
  templateUrl: './dhcp-server-detail.component.html',
  styleUrls: ['./dhcp-server-detail.component.css'],
})
export class DHCPServerDetailComponent implements OnInit {
  statusMessage: string = '';
  dhcpServers: DHCPSummary[] = [];
  dhcpScopes: DHCPScope[] = [];

  pageTitle: string;
  width: number = 0;
  scopeName: string;
  scopeComments: string;
  scopeAddressRange: any = {
    "Scope Name":"vlan1",
    "Scope Range":"192.168.15.10 - 192.168.15.254",
    "Excluded Range":"192.168.15.10 - 192.168.15.50<br>192.168.15.10 - 192.168.15.50<br>192.168.15.221 - 192.168.15.254",
    "Related Scopes":"No Related Scopes Found"
  }

  constructor(private dHCPserviceService: DHCPserviceService) {}

  ngOnInit(): void {
    this.getDHCPSummaryData();
    this.getDHCPScopeData();
  }

  getDHCPSummaryData() {
    this.statusMessage = 'Loading data...';
    this.dHCPserviceService.getDHCPSummary(4).then((data) => {
      this.dhcpServers = data;
    });
  }

  getDHCPScopeData() {
    this.statusMessage = 'Loading data...';
    this.dHCPserviceService.getDHCPScopeDetail(0).then((data) => {
      this.dhcpScopes = data;
    });
  }

  editScopeName(dhcpScope: DHCPScope) {
    this.pageTitle = "Edit DHCP Scope";
    this.width = 100;
    this.scopeName = dhcpScope.scopeName;
    this.scopeComments = dhcpScope.scopeComments;
    
  }

  closeDiv(width: number) {
    this.width = width;
  }
}
