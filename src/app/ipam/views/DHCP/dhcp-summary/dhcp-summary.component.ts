import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
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
  selectedIpDetail: DHCPSummary = new DHCPSummary();

  cmenuitems: MenuItem[];
  pageTitle: string;
  width = 0;

  constructor(private dHCPserviceService: DHCPserviceService) {
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
    this.getDHCPSummaryData();
  }

  getDHCPSummaryData() {
    this.statusMessage = 'Loading data...';
    this.dHCPserviceService.getDHCPSummary(4).then((data) => {
      this.dhcpServers = data;
    });
  }

  openCM(event: MouseEvent, contextMenu: ContextMenu, dhcpServer: any) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedIpDetail = dhcpServer;
    contextMenu.show(event);
    return false;
  }

  testIP(ip) {
    this.pageTitle = ip.item.label;
    this.width = 100;
  }

  closeDiv(width) {
    this.selectedIpDetail = new DHCPSummary();
    this.width = width;
  }
}
