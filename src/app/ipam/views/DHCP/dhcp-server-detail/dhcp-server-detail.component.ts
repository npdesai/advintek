import { Component, OnInit } from '@angular/core';
import { DHCPScope } from 'src/app/ipam/models/DHCPScope';
import { DHCPserviceService } from 'src/app/ipam/services/dhcpservice.service';

@Component({
  selector: 'app-dhcp-server-detail',
  templateUrl: './dhcp-server-detail.component.html',
  styleUrls: ['./dhcp-server-detail.component.css'],
})
export class DHCPServerDetailComponent implements OnInit {
  statusMessage: string = '';
  dhcpScopes: DHCPScope[] = [];

  pageTitle: string;
  width: number = 0;
  scopeName: string;
  scopeComments: string;
  scopeAddressRange: any = {
    'Scope Name': 'vlan1',
    'Scope Range': '192.168.15.10 - 192.168.15.254',
    'Excluded Range':
      '192.168.15.10 - 192.168.15.50<br>192.168.15.10 - 192.168.15.50<br>192.168.15.221 - 192.168.15.254',
    'Related Scopes': 'No Related Scopes Found',
  };

  constructor(private dHCPserviceService: DHCPserviceService) {}

  ngOnInit(): void {
    this.getDHCPScopeData();
  }

  getDHCPScopeData() {
    this.statusMessage = 'Loading data...';
    this.dHCPserviceService.getDHCPScopeDetail(0).then((data) => {
      this.dhcpScopes = data;
      this.dhcpScopes.forEach(
        (d) =>
          (d.tooltip = `<div>
  <div class="d-flex align-items-start">
    <h6 class="w-25 mb-0">Scope Name</h6>&nbsp;:&nbsp;&nbsp;
    <div class="w-75">${d.name}</div>
  </div>
  <div class="d-flex align-items-start">
    <h6 class="w-25 mb-0">Scope Range</h6>&nbsp;:&nbsp;&nbsp;
    <div class="w-75">${d.range}</div>
  </div>
  <div class="d-flex align-items-start">
    <h6 class="w-25 mb-0">Excluded Range</h6>&nbsp;:&nbsp;&nbsp;
    <div class="w-75">${d.excludedRange.join('<br />')}</div>
  </div>
  <div class="d-flex align-items-start">
    <h6 class="w-25 mb-0">Related Scopes</h6>&nbsp;:&nbsp;&nbsp;
    <div class="w-75">${d.relatedScops}</div>
  </div>
</div>`)
      );
    });
  }

  editScopeName(dhcpScope: DHCPScope) {
    this.pageTitle = 'Edit DHCP Scope';
    this.width = 100;
    this.scopeName = dhcpScope.name;
    this.scopeComments = dhcpScope.comments;
  }

  closeDiv(width: number) {
    this.width = width;
  }
}
