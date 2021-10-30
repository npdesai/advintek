import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Domain, ServerType, SubnetGroup, SubnetMask } from '../../models/master';
import { AddIpv4Subnet, AddIpv6Subnet } from '../../models/subnet';
import { CompanyService } from '../../services/company.service';
import { DomainService } from '../../services/domain.service';
import { LoadingDataService } from '../../services/loading-data.service';
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
  addIpv4Title = 'Add IPv4 Subnet';
  addIpv6Title = 'Add IPv6 Subnet/Site';
  addDHCPTitle = 'Add DHCP Server';
  addDomainTitle = 'Add AD Domain';
  @Input('pageTitle') set pageTitle(value) {
    this.isAddIPv4Subnet = value === this.addIpv4Title;
    this.isAddIPv6SubnetSite = value === this.addIpv6Title;
    this.isAddDHCPServer = value === this.addDHCPTitle;
    this.isAddManual = true;
    this.isGP = true;
    this._pageTitle = value;
  }
  @Output() pageTitleChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  isAddIPv4Subnet: boolean = false;
  isAddIPv6SubnetSite: boolean = false;
  isAddDHCPServer: boolean = false;
  prefixLengths: any = [];
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

  addSubnet = new AddIpv4Subnet();
  addIpv6Subnet = new AddIpv6Subnet();
  subnetGroups : SubnetGroup[] = [];
  subnetMasks:SubnetMask[] = [];
  serverTypes: ServerType[] = [];
  domainList: Domain[] = [];

  constructor(
    private subnetService : SubnetService,
    private masterService : MasterService,
    private companyService : CompanyService,
    private loaderService : LoadingDataService,
    private domainService: DomainService,
  ) {
    this.getSubnetGroups();
    this.getSubnetMasks();
    this.getServerTypes();
    this.getDomainList();

    for(let i = 1; i <= 128; i++)
    {
      this.prefixLengths.push({ name: i.toString(), code: i });
    }

    this.protocols = [
      { name: 'Telnet', code: 'telnet' },
      { name: 'SSH', code: 'ssh' }
    ]

    this.getSubnetCompanies();

    this.newaddSubnetModel();
  }

  ngOnInit(): void {
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

  newaddIpv6SubnetModel() {
    this.addIpv6Subnet.companyId="";
    this.addIpv6Subnet.companyName="";
    this.addIpv6Subnet.prefixAddress="";
    this.addIpv6Subnet.prefixDescription="";
    this.addIpv6Subnet.prefixLength=null;
    this.addIpv6Subnet.prefixName="";
  }

  onCancel() {
    this.closeWidth.emit(0);
    this.newaddSubnetModel();
    this.newaddIpv6SubnetModel();
    this.isAdd = false;
    this._pageTitle = this.addDHCPTitle;
  }

  addClick() {
    this.isAdd = !this.isAdd;
  }

  getDomainList() {
    this.domainService.getDomainList().subscribe((data) => {
      if(data) {
        console.log(data);
        this.domainList = data;
      }
    });
  }

  onAddDomainCancel() {
    this._pageTitle = this.addDHCPTitle;
  }

  save(){
    if(this.isAddIPv4Subnet){
      this.saveIpv4Subnet();
    } else if(this.isAddIPv6SubnetSite) {
      this.saveIpv6SubnetSite();
    }
  }

  saveIpv4Subnet() {
    this.loaderService.showLoader();
    if(this.addSubnet.subnetGroupName == ""){
      this.addSubnet.subnetGroupId = this.addSubnet.subnetGroup.groupId;
    }

    if(this.addSubnet.subnetMask){
      this.addSubnet.subnetMaskId = this.addSubnet.subnetMask.maskId;
    }

    this.subnetService.saveIPV4Subnet(this.addSubnet).subscribe((data) => {
      if(data){
        this.loaderService.hideLoader();
        this.onCancel();
      }
    });
  }

  saveIpv6SubnetSite() {
    this.loaderService.showLoader();
    
    if(this.addIpv6Subnet.subnetCompany && this.addIpv6Subnet.companyName === "") {
      this.addIpv6Subnet.companyId = this.addIpv6Subnet.subnetCompany.companyId;
    }

    if(this.addIpv6Subnet.subnetPrefixLength) {
      this.addIpv6Subnet.prefixLength = this.addIpv6Subnet.subnetPrefixLength.prefixLength;
    }

    this.subnetService.saveIPV6Subnet(this.addIpv6Subnet).subscribe((data) => {
      if(data) {
        this.loaderService.hideLoader();
        this.getSubnetCompanies();
        this.onCancel();
      }
    })
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

  getServerTypes() {
    this.masterService.getServerTypes().subscribe((data) => {
      if(data) {
        this.serverTypes = data;
      }
    })
  }

  getSubnetCompanies() {
    this.companyService.getSubnetCompanies().subscribe((data) => {
      if(data) {
        this.companies = data;
      }
    })
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
