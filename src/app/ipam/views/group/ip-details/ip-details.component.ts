import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { IpDetail } from 'src/app/ipam/models/ipDetail';

@Component({
  selector: 'app-ip-details',
  templateUrl: './ip-details.component.html',
  styleUrls: ['./ip-details.component.css']
})
export class IpDetailsComponent implements OnInit {
  @Input() ipDetails: IpDetail[];
  @Input() statusMessage : string;

  // @Output() pageTitle: string;
  // @Output() selectedIpDetail: IpDetail = new IpDetail();
  // @Output() width: number = 0;

  cmenuitems: MenuItem[];
  pageTitle: string;
  width = 0;
  selectedIpDetail: IpDetail = new IpDetail();

  constructor() { 
    this.cmenuitems = [
      { label: 'Ping', command: (item) => this.testIP(item) },
      // { label: 'SNMP Ping', command: (item) => this.testIP(item) },
      // { label: 'Resolve DNS', command: (item) => this.testIP(item) },
      // { label: 'Resolve MAC Address', command: (item) => this.testIP(item) },
      { label: 'Trace Route', command: (item) => this.testIP(item) },
      // { label: 'System Explorer', command: (item) => this.testIP(item) },
    ];
  }

  ngOnInit(): void {
  }

  testIP(ip) {
    this.pageTitle = ip.item.label;
    this.width = 100;
  }

  openCM(event: MouseEvent, contextMenu: ContextMenu, ipDetail: IpDetail) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedIpDetail = ipDetail;
    contextMenu.show(event);
    return false;
  }

  closeDiv(width) {
    this.selectedIpDetail = new IpDetail();
    this.width = width;
  }
}
