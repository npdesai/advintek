import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IpDetail } from 'src/app/ipam/models/ipDetail';

@Component({
  selector: 'app-test-ip',
  templateUrl: './test-ip.component.html',
  styleUrls: ['./test-ip.component.css']
})
export class TestIpComponent implements OnInit {
  @Input() openWidth = 0;
  @Output() openWidthChange = new EventEmitter<any>();
  _pageTitle: any;
  get pageTitle(): any {
    return this._pageTitle;
  }
  @Input('pageTitle') set pageTitle(value) {
    this.isPing = value === 'Ping';
    this.isSNMPPing = value === 'SNMP Ping';
    this.isResolveDNS = value === 'Resolve DNS';
    this.isResolveMACAddress = value === 'Resolve MAC Address';
    this.isTraceRoute = value === 'Trace Route';
    this.isSystemExplorer = value === 'System Explorer';
    this._pageTitle = value;
  }
  @Output() pageTitleChange = new EventEmitter<any>();
  @Input() ipDetail: IpDetail;
  @Output() ipDetailChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  isPing: boolean = false;
  isSNMPPing: boolean = false;
  isResolveDNS: boolean = false;
  isResolveMACAddress: boolean = false;
  isTraceRoute: boolean = false;
  isSystemExplorer: boolean = false;

  credentials: any;

  constructor() { 
    this.credentials = [
      { name: 'None', code: 'None' },
    ];
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.closeWidth.emit(0);
  }

}
