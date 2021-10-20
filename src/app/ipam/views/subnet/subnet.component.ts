import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { AlertType, Helper } from '../../../common/helper';
import {
  RequestOptions,
  SearchFilter,
  SortElement,
  SortOrder,
} from '../../../common/models/requestOptions';
import {
  DateSearch,
  DropDownSearch,
  SearchField,
  TextSearch,
} from '../../../common/models/searchField';
import { IpDetail } from '../../models/ipDetail';
import { IpHistory } from '../../models/ipHistory';
import { Subnet } from '../../models/subnet';
import { SubnetService } from '../../services/subnet.service';

declare var $: any;

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.css'],
  providers: [SubnetService],
})
export class SubnetComponent {
  subnets: Subnet[] = [];
  subnet: Subnet;
  ipDetails: IpDetail[] = [];
  ipHistories: IpHistory[] = [];
  selectedIpDetail: IpDetail = new IpDetail();

  statusMessage: string = '';
  modes: string[] = [];
  selectedMode: string = 'view';

  sortElement: SortElement;
  pageSizes = [10, 20, 50, 100];
  pageSize = this.pageSizes[0];
  currentPage = 1;
  totalPages = 1;
  recordCount = 0;
  searchFilter: SearchFilter;
  searchFields: SearchField[];
  fields: string[];
  previousElement: HTMLElement;

  reqSent: boolean = false;

  cmenuitems: MenuItem[];

  pageTitle: string;
  width = 0;
  subnetId ="";

  constructor(
    private subnetService: SubnetService,
    public dialog: MatDialog,
    private helper: Helper,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.getFormData();    
    this.getIpHistories();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subnetId = params.get('Id');
      this.getSubnetIpData(this.subnetId);
    })
  }

  getSubnetIpData(subnet:string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetIps(subnet).subscribe((data) => {
      this.ipDetails = data;
    });
  }

  updateSubnetIpDetail(subnetIpId:string) {
    if(this.reqSent) {
      return;
    }
    this.reqSent = true;
    this.subnetService.updateSubnetIpDetail(subnetIpId).subscribe((data) => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.subnetId = params.get('Id');
        this.getSubnetIpData(this.subnetId);
      });
      this.reqSent = false;
    });
  }

  getIpHistories() {
    this.statusMessage = "Loading data...";
    this.subnetService.getIpHistories(4).then((data) => {
      this.ipHistories = data;
    })
  }

  getFormData() {
    //$("#ajax-loading").show();

    // let requestOptions: RequestOptions = {
    //   page: this.currentPage,
    //   pageSize: this.pageSize,
    //   searchFilter: this.searchFilter,
    //   sortElement: this.sortElement,
    //   fields: this.fields
    // };

    this.statusMessage = 'Loading data...';

    // this.subnetService.getSubnets(requestOptions).subscribe(
    //   resp => {

    //     if (resp.status.toLowerCase() == "error") {
    //       this.statusMessage = 'Error loading subnets';
    //       this.helper.showMessage(resp.message, AlertType.Error);
    //       this.clearSubnets();
    //     }
    //     else {
    //       if (resp.data != null && resp.data.length > 0) {
    //         this.subnets = resp.data;
    //         this.totalPages = Math.ceil(resp.recordCount / this.pageSize);
    //         this.recordCount = resp.recordCount;
    //         this.statusMessage = '';
    //       }
    //       else {
    //         this.statusMessage = "No subnets added.";
    //         this.clearSubnets();
    //       }
    //     }

    //     $("#ajax-loading").hide();
    //   },
    //   (err) => {
    //     $("#ajax-loading").hide();
    //     this.clearSubnets();
    //     this.helper.showMessage(`Error loading subnets : ${err || err.message}`, AlertType.Error);
    //     this.statusMessage = "Error loading subnets.";
    //   });
  }

  openCM(event: MouseEvent, contextMenu: ContextMenu, ipDetail: any) {
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

  closeDiv(width) {
    this.selectedIpDetail = new IpDetail();
    this.width = width;
  }

  // clearSubnets() {
  //   this.subnets.length = 0;
  //   this.totalPages = 1;
  //   this.recordCount = 0;
  // }

  // onColumnClick(e: any) {

  //   if (e.getAttribute('data-column') == "" || e.getAttribute('data-column') == null) return;

  //   let sortColumn = e.getAttribute('data-column');
  //   let parentNode = <HTMLElement>e;

  //   if (sortColumn == "" || sortColumn == null) return;

  //   if (this.previousElement && sortColumn != this.previousElement.getAttribute('data-column')) {
  //     let prevParentNode = <HTMLElement>this.previousElement.parentNode;

  //     prevParentNode.classList.remove('table-sorter-desc');
  //     prevParentNode.classList.remove('table-sorter-asc');
  //   }

  //   this.previousElement = e;

  //   let sortOrder = SortOrder.descending;

  //   if (parentNode.classList.contains("table-sorter-asc")) {
  //     parentNode.classList.remove('table-sorter-asc');
  //     parentNode.classList.add('table-sorter-desc');
  //     sortOrder = SortOrder.descending;
  //   }
  //   else if (parentNode.classList.contains("table-sorter-desc")) {
  //     parentNode.classList.remove('table-sorter-desc');
  //     //sortColumn = null;
  //     sortOrder = SortOrder.noSort;
  //   }
  //   else {
  //     parentNode.classList.add('table-sorter-asc');
  //     sortOrder = SortOrder.ascending;
  //   }

  //   this.sortElement = { propertyName: sortColumn, sortOrder: sortOrder };
  //   this.getFormData();
  // }

  // onSearchClick($event: any) {
  //   this.searchFilter = $event;
  //   this.currentPage = 1;
  //   this.getFormData();
  // }

  // onPageSizeChange(pageSize: number) {
  //   this.pageSize = pageSize;
  //   this.currentPage = 1;
  //   this.getFormData();
  // }

  // onPageChange(currentPage: number) {
  //   this.currentPage = currentPage;
  //   this.getFormData();
  // }

  // downloadList() {

  //   let fields = JSON.parse(JSON.stringify(this.fields));
  //   fields = fields.filter(ele => { return ele != "Id"; });

  //   let requestOptions: RequestOptions = {
  //     searchFilter: this.searchFilter,
  //     sortElement: this.sortElement,
  //     fields: fields
  //   };

  //   $("#ajax-loading").show();

  //   this.subnetService.downloadSubnets(requestOptions).subscribe(
  //     (event) => {

  //       if (event.type === HttpEventType.Response) {
  //         $("#ajax-loading").hide();
  //        // Download File
  //       }
  //     },
  //     (err) => {
  //       $("#ajax-loading").hide();
  //       this.helper.showMessage(`Error downloading subnets : ${err || err.message}`, AlertType.Error);
  //     });
  // }

  // add() {
  //   this.subnet = new Subnet();
  //   this.selectedMode = "edit";
  //   $('.float-box').toggleClass('float-box-hide');
  // }

  // async save() {

  //   $("#ajax-loading").show();

  //   var errorMessages = await this.validateItem(this.subnet);

  //   if (errorMessages.length == 0) {

  //     this.subnetService.save(this.subnet).subscribe(
  //       resp => {

  //         $("#ajax-loading").hide();

  //         if (resp.status.toLowerCase() == "error") {
  //           this.helper.showMessage(resp.message, AlertType.Error);
  //         }
  //         else {
  //           if (resp.data != null) {
  //             this.helper.showMessage(`${this.subnet.address} information saved`, AlertType.Success);
  //             this.close();
  //             this.getFormData();
  //           }
  //           else
  //             this.helper.showMessage("Unable to save item information.", AlertType.Error);
  //         }
  //       },
  //       (err) => {
  //         $("#ajax-loading").hide();
  //         this.helper.showMessage(`Unable to save ${this.subnet.address} information : ${err || err.message}`, AlertType.Error);
  //       });
  //   }
  //   else {
  //     $("#ajax-loading").hide();
  //     this.helper.showMessage(Helper.getErrorMessagesText(errorMessages), AlertType.Error);
  //   }
  // }

  // async validateItem(subnet: Subnet): Promise<string[]> {
  //   var errorMessages = [];

  //   return errorMessages;
  // }

  // close() {
  //   $('.float-box').toggleClass('float-box-hide');
  // }
}
