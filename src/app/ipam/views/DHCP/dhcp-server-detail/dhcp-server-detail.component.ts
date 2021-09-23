import { Component, OnInit } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

import { DHCPScope } from 'src/app/ipam/models/DHCPScope';
import { DHCPserviceService } from 'src/app/ipam/services/dhcpservice.service';
import { IpDetail } from 'src/app/ipam/models/ipDetail';
import { SubnetService } from '../../../services/subnet.service';

@Component({
  selector: 'app-dhcp-server-detail',
  templateUrl: './dhcp-server-detail.component.html',
  styleUrls: ['./dhcp-server-detail.component.css'],
})
export class DHCPServerDetailComponent implements OnInit {
  statusMessage: string = '';
  dhcpScopes: DHCPScope[] = [];
  cmenuitems: MenuItem[];

  pageTitleEdit: string;
  widthEdit: number = 0;
  scopeName: string;
  scopeComments: string;
  pageTitle: string;
  width: number = 0;
  
  allComplete: boolean = false;

  ipDetails: IpDetail[] = [];
  selectedIpDetail: IpDetail = new IpDetail();

  constructor(
    private dHCPserviceService: DHCPserviceService,
    private subnetService: SubnetService
    ) {
    this.cmenuitems = [
      { label: 'Ping', command: (item) => this.testIP(item) },
      { label: 'SNMP Ping', command: (item) => this.testIP(item) },
      { label: 'Resolve DNS', command: (item) => this.testIP(item) },
      { label: 'Resolve MAC Address', command: (item) => this.testIP(item) },
      { label: 'Trace Route', command: (item) => this.testIP(item) },
      { label: 'System Explorer', command: (item) => this.testIP(item) },
    ];
  }

  ngOnInit(): void {
    this.getDHCPScopeData();
    this.getSubnetIpData();
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
    this.pageTitleEdit = 'Edit DHCP Scope';
    this.widthEdit = 100;
    this.scopeName = dhcpScope.name;
    this.scopeComments = dhcpScope.comments;
  }

  getSubnetIpData() {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetIps(4).then((data) => {
      this.ipDetails = data;
    });
  }

  closeDivEdit(width: number) {
    this.widthEdit = width;
  }

  openCM(event: MouseEvent, contextMenu: ContextMenu, ipDetail: IpDetail) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedIpDetail = ipDetail;
    contextMenu.show(event);
    return false;
  }

  testIP(ip) {
    this.pageTitle = ip.item.label;
    this.width = 100;
  }

  closeDiv(width: number) {
    this.width = width;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.ipDetails == null) {
      return;
    }
    this.ipDetails.forEach(t => t.isSelected = completed);
  }
}
