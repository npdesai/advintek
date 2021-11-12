import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IpDetail } from 'src/app/ipam/models/ipDetail';
import { IpPing, PingOptions } from '../../models/ipPing';
import { LoadingDataService } from '../../services/loading-data.service';
import { SubnetService } from '../../services/subnet.service';

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
    this.isEditIpDetail = value === 'Edit IP Details';
    this._pageTitle = value;
  }
  @Output() pageTitleChange = new EventEmitter<any>();
  @Input() ipDetail: any;
  @Output() ipDetailChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  @ViewChild ('traceRouteForm') traceRouteForm : NgForm;

  isPing: boolean = false;
  isSNMPPing: boolean = false;
  isResolveDNS: boolean = false;
  isResolveMACAddress: boolean = false;
  isTraceRoute: boolean = false;
  isSystemExplorer: boolean = false;
  isEditIpDetail: boolean = false;
  statusMessage: string = '';

  credentials: any;
  ipAvailabilities: any;
  reservedStatuses: any;
  tracedRouteIps: any

  ipPing:IpPing;

  constructor(private subnetService:SubnetService, private loaderService: LoadingDataService) { 

    this.credentials = [
      { name: 'None', code: 'None' },
    ];
    this.ipAvailabilities = [
      { name: 'Used', code: 'Used'},
      { name: 'Quarantine', code: 'Quarantine'},
      { name: 'Available', code: 'Available'},
      { name: 'Not Reachable', code: 'Not Reachable'}
    ];
    this.reservedStatuses = [
      { name: 'Reserved - Static IP Addresses', code: 'Reserved - Static IP Addresses'},
      { name: 'Not Reserved', code: 'Not Reserved'}
    ]

    this.ipPing = new IpPing();
    this.ipPing.options = new PingOptions();
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.closeWidth.emit(0);
  }

  onPing(subnetIp){
    this.subnetService.getIpPing(subnetIp).subscribe((res)=>{
        this.ipPing = res;
        this.ipPing.options = this.ipPing.options != null ? this.ipPing.options : new PingOptions();        
    });
  }

  onTraceRoute(values: any) {
    this.statusMessage = "Loading data..";
    this.loaderService.showLoader();
    this.subnetService.traceIpRoute(this.traceRouteForm.controls.traceIp.value).subscribe((data) => {
      if(data) {
        this.loaderService.hideLoader();
        this.tracedRouteIps = data;
      }
    });
  }

}
