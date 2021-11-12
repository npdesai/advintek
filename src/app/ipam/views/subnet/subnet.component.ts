import { HttpEventType } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
//import * as jsPDF from 'jspdf'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
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
import { AddIpv4Subnet, Subnet, SubnetGroupDetail } from '../../models/subnet';
import { LoadingDataService } from '../../services/loading-data.service';
import { SubnetService } from '../../services/subnet.service';

declare var $: any;

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.css'],
  providers: [SubnetService],
})
export class SubnetComponent {
  @ViewChild('content') content:ElementRef;

  subnets: Subnet[] = [];
  subnet: Subnet;
  ipDetails: IpDetail[] = [];
  ipHistories: IpHistory[] = [];
  selectedIpDetail: IpDetail = new IpDetail();
  editSelectedIpDetail: IpDetail = new IpDetail();

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

  cmenuitems: MenuItem[];

  pageTitle: string;
  width = 0;
  editWidth = 0;
  editSubnetWidth = 0;
  subnetId ="";
  eChartOptions: any;
  subnetSummary: SubnetGroupDetail = new SubnetGroupDetail();
  subnetDetail: AddIpv4Subnet = new AddIpv4Subnet();
  exportPdfData:string[][] = [];
  exportRow:string[] = [];

  constructor(
    private subnetService: SubnetService,
    public dialog: MatDialog,
    private helper: Helper,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoadingDataService
  ) {
    this.cmenuitems = [
      { label: 'Ping', command: (item) => this.testIP(item) },
      // { label: 'SNMP Ping', command: (item) => this.testIP(item) },
      // { label: 'Resolve DNS', command: (item) => this.testIP(item) },
      // { label: 'Resolve MAC Address', command: (item) => this.testIP(item) },
      { label: 'Trace Route', command: (item) => this.testIP(item) },
      { label: 'Scan Now', command: (item) => this.scanIP(this.selectedIpDetail.subnetIPId)}
      // { label: 'System Explorer', command: (item) => this.testIP(item) },
    ];       
  }

  ngOnInit() {   
    this.getFormData();       
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subnetId = params.get('Id');
      this.getSubnetIpData(this.subnetId);
      this.getIpHistories(this.subnetId);
      this.getSubnetSummary(this.subnetId);
      this.getSubnetDetail(this.subnetId);
    })
  }

  getSubnetIpData(subnet:string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetIps(subnet).subscribe((data) => {
      this.ipDetails = data;
    });
  }

  getSubnetDetail(subnetId:string) {
    this.subnetService.getSubnetDetail(subnetId).subscribe((data) => {
      if(data) {
        this.subnetDetail = data;
      }
    })
  }

  getSubnetSummary(subnetId:string) {
    this.statusMessage = "Loading data...";
    this.subnetService.getSubnetSummary(subnetId).subscribe((data) => {
      this.subnetSummary = data;
      this.generateAvailabilityChart(this.subnetSummary.notReachable,
           this.subnetSummary.used,this.subnetSummary.quarantine,this.subnetSummary.available,
           this.subnetSummary.subnetSize - (this.subnetSummary.quarantine+this.subnetSummary.used+this.subnetSummary.available+this.subnetSummary.notReachable));     
      /* Hide loader if it is in show state */
      this.loaderService.hideLoader();
    });
  }

  scanIP(subnetIpId:string) {
    this.loaderService.showLoader();
    this.subnetService.scanIP(subnetIpId).subscribe((data) => {  
      this.ipDetails.map((ip) => {
        if(ip.subnetIPId === subnetIpId)
        {
          ip.macAddress = data.macAddress,
          ip.status = data.status,
          ip.deviceType = data.deviceType,
          ip.connectedSwitch = data.connectedSwitch,
          ip.lastScan = data.lastScan,
          ip.scanStatus = data.scanStatus
        }
      })
      this.loaderService.hideLoader();
    });
  }

  getIpHistories(subnetId) {
    this.statusMessage = "Loading data...";
    this.subnetService.getIpHistories(subnetId).subscribe((data) => {
      this.ipHistories = data;
    })
  }

  scanSubnet() {
    this.loaderService.showLoader();
    this.getSubnetSummary(this.subnetId);
  }

  editSubnet() {
    this.editSubnetWidth = 100;
  }

  deleteSubnet() {
    this.loaderService.showLoader();
    this.subnetService.delete(this.subnetId).subscribe((data) => {
      if(data) {
        this.router.navigate(['/']);
        this.loaderService.hideLoader();
      }
    })
  }

  showSubnetIPDetail(ipDetail) {
    this.router.navigate([`ipam/subnets/subnetip/${ipDetail.subnetIPId}`]);
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

  editIpDetails(ipDetail) {
    this.editSelectedIpDetail = ipDetail;   
    this.editWidth = 100;    
  }

  closeDiv(width) {    
    this.selectedIpDetail = new IpDetail();
    this.width = width;
  }

  closeDivEdit(width) {    
    this.editSelectedIpDetail = new IpDetail();
    this.editWidth = width;
  }

  closeEditSubnetDiv(width) {
    this.getSubnetSummary(this.subnetId);
    this.editSubnetWidth = width;
  }

  generateAvailabilityChart(notReachable:number,used:number,quarantine:number,available:number,notScanned:number){    
    this.eChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Not Reachable',
            itemStyle: {
              color: '#6c757d'
            }
          },
          {
            icon: 'circle',
            name: 'Available',
            itemStyle: {
              color: '#28a745'
            }
          },
          {
            icon: 'circle',
            name: 'Quarantine',
            itemStyle: {
              color: '#ffc107'
            }
          },
          {
            icon: 'circle',
            name: 'Used',
            itemStyle: {
              color: '#dc3545'
            }
          },
          {
            icon: 'circle',
            name: 'Not Scanned',
            itemStyle: {
              color: '#6a8d17'
            }
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { 
              value: notReachable, 
              name: 'Not Reachable',
              itemStyle: {
                color: '#6c757d'
              }
            },
            { 
              value: available, 
              name: 'Available',
              itemStyle: {
                color: '#28a745'
              } 
            },
            { 
              value: quarantine, 
              name: 'Quarantine',
              itemStyle: {
                color: '#ffc107'
              }
            },
            { 
              value: used, 
              name: 'Used',
              itemStyle: {
                color: '#dc3545'
              } 
            },
            { 
              value: notScanned, 
              name: 'Not Scanned',
              itemStyle: {
                color: '#6a8d17'
              } 
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  title = 'export-table-data-to-pdf-using-jspdf-example';

  iphead = [['ipAddress', 'macAddress', 'status', 'scanStatus','deviceType','connectedSwitch']];
  ipHistoryHead = [['ipAddress', 'detectedTime', 'dnsName', 'macAddress', 'deviceType']];

  ExportPdfData(type){
    if(type === 'ip') {
      this.ipDetails.forEach(element => {  
        this.exportRow = [];
        this.exportRow.push(
          element["ipAddress"], 
          element["macAddress"], 
          element["status"], 
          element["scanStatus"], 
          element["deviceType"], 
          element["connectedSwitch"]);
          
          this.exportPdfData.push(this.exportRow);   
        });    
      } else if(type === 'ipHistory') {
        this.ipHistories.forEach(element => {
        this.exportRow = [];
        this.exportRow.push(
          element['ipAddress'], 
          element['detectedTime'], 
          element['dnsName'], 
          element['macAddress'], 
          element['deviceType']);

        this.exportPdfData.push(this.exportRow);   
      });
    }
    
    this.SavePDF(type);
  }

  public SavePDF(type) {  
    let content=this.content.nativeElement;  
    let doc = new jsPDF();    
    const isIpType = type === 'ip';

    doc.setFontSize(18);
    doc.text(isIpType ? 'IP Detail' : 'IP History', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: isIpType ? this.iphead : this.ipHistoryHead,
      body: this.exportPdfData,
      theme: 'plain',
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    //doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(isIpType ? 'IpDetail.pdf' : 'IpHistory.pdf'); 
    this.exportPdfData.length = 0;
  }

  ExportCsvData(type) {
    var isIpType = type === 'ip';
    var exportData = isIpType ? this.ipDetails : this.ipHistories;
    exportData.forEach(function (entry) {
      delete entry['subnetIPId'];
      delete entry['subnetId'];
      delete entry['subnet'];
      delete entry['subnetIPHistoryId'];
      delete entry['sysDescription'];
    });

    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(exportData[0]);
    const csv = exportData.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = isIpType ? 'IpDetail.csv' : 'IpHistory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
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
