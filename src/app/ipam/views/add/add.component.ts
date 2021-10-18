import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { SubnetGroup, SubnetMask } from '../../models/master';
import { AddSubnet } from '../../models/subnet';
import { MasterService } from '../../services/master.service';
import { SubnetService } from '../../services/subnet.service';

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

  addSubnet = new AddSubnet();
  subnetGroups : SubnetGroup[] = [];
  subnetMasks:SubnetMask[] = [];

  constructor(
    private subnetService : SubnetService,
    private masterService : MasterService
  ) {
    this.getSubnetGroups();
    this.getSubnetMasks();

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

    this.newaddSubnetModel();
  }

  ngOnInit(): void {
    this.selectedServerType = this.serverTypes[0].code;
    this.selectedProtocol = this.protocols[0].code;
    this.selectedPafType = this.pafRadio1;
  }

  newaddSubnetModel(){
    this.addSubnet.subnetAddress="";
    this.addSubnet.location="";
    this.addSubnet.subnetDescription="";
    this.addSubnet.subnetGroupName="";
    this.addSubnet.subnetName="";
    this.addSubnet.vlanName="";
    this.addSubnet.subnetGroupId=null;
    this.addSubnet.subnetMaskId="";
  }

  onCancel() {
    this.closeWidth.emit(0);
    this.newaddSubnetModel();
    this.isAdd = false;
  }

  addClick() {
    this.isAdd = !this.isAdd;
  }

  save(){
    if(this.isAddIPv4Subnet){
      this.saveIpv4Subnet();
    }
  }

  saveIpv4Subnet() {
    if(this.addSubnet.subnetGroupName == ""){
      this.addSubnet.subnetGroupId = this.addSubnet.subnetGroup.groupId;
    }

    if(this.addSubnet.subnetMask){
      this.addSubnet.subnetMaskId = this.addSubnet.subnetMask.maskId;
    }

    this.subnetService.saveIPV4Subnet(this.addSubnet).subscribe((data) => {
      if(data){
        this.onCancel();
      }
    });
  }

  getSubnetGroups() {
    this.masterService.getSubnetGroups().subscribe((data) => {
      if(data){
        this.subnetGroups = data;
      }
    });
  }

  getSubnetMasks() {
    this.masterService.getSubnetMask().subscribe((data) => {
      if(data){
        this.subnetMasks = data;
      }
    });
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
