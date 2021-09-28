import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() openWidth = 0;
  @Output() openWidthChange = new EventEmitter<any>();
  _pageTitle: any;
  get pageTitle(): any {
    return this._pageTitle;
  }
  @Input('pageTitle') set pageTitle(value) {
    this.isAddIPv4Subnet = value === 'Add IPv4 Subnet';
    this.isAddIPv6SubnetSite = value === 'Add IPv6 Subnet/Site';
    this.isAddDHCPServer = value === 'Add DHCP Server';
    this._pageTitle = value;
  }
  @Output() pageTitleChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  isAddIPv4Subnet: boolean = false;
  isAddIPv6SubnetSite: boolean = false;
  isAddDHCPServer: boolean = false;
  groups: any;
  subnetmasks: any;
  prefixLengths: any;
  adDomains: any;
  serverTypes: any;
  selectedServerType: string;
  protocols: any;
  selectedProtocol: string;
  selectedPafType: string;
  pafRadio1: string = 'restapi';
  pafRadio2: string = 'clicredential';

  isAddManual: boolean = true;
  isAdd: boolean = false;

  uploadedFiles: any[] = [];

  isGP: boolean = true;
  companies: any;

  constructor() {
    this.groups = [
      { name: 'Group 1', code: 'G1' },
      { name: 'Group 2', code: 'G2' },
    ];

    this.subnetmasks = [
      { name: 'Sub 1', code: 'S1' },
      { name: 'Sub 2', code: 'S2' },
    ];

    this.prefixLengths = [
      { name: '1', code: '1' },
      { name: '2', code: '2' },
    ];

    this.adDomains = [
      { name: 'Domain 1', code: 'D1' },
      { name: 'Domain 2', code: 'D2' },
    ];

    this.serverTypes = [
      { name: 'Microsoft DHCP Server', code:'mds'},
      { name: 'Palo Alto Firewall', code:'paf'},
      { name: 'Linux Server', code:'ls'},
      { name: 'Cisco Router', code:'cr'},
      { name: 'Fortinet Firewall', code:'ff'},
    ]

    this.protocols = [
      { name: 'Telnet', code: 'telnet' },
      { name: 'SSH', code: 'ssh' }
    ]
    
    this.companies = [
      { name: 'Company 1', code: 'C1' },
      { name: 'Company 2', code: 'C2' },
    ];
  }
  
  ngOnInit(): void {
    this.selectedServerType = this.serverTypes[0].code;
    this.selectedProtocol = this.protocols[0].code;
    this.selectedPafType = this.pafRadio1;
  }

  onCancel() {
    this.closeWidth.emit(0);
  }

  addClick() {
    this.isAdd = !this.isAdd;
  }

  ipv4RadioChange(event: MatRadioChange) {
    this.isAddManual = event.value === 'addmanual';
    this.selectedPafType = event.value;
  }

  ipv6RadioChange(event: MatRadioChange) {
    this.isGP = event.value === 'gp';
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onServerTypeChange(event) {
    this.selectedServerType = event.value;
    this.selectedPafType = this.pafRadio1;
  }
}
