import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubnetMask, SubnetGroup } from 'src/app/ipam/models/master';
import { AddIpv4Subnet } from 'src/app/ipam/models/subnet';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { MasterService } from 'src/app/ipam/services/master.service';
import { SubnetService } from 'src/app/ipam/services/subnet.service';

@Component({
  selector: 'app-update-subnet',
  templateUrl: './update-subnet.component.html',
  styleUrls: ['./update-subnet.component.css']
})
export class UpdateSubnetComponent implements OnInit {
  @Input() openWidth = 0;
  @Input() subnet : AddIpv4Subnet;
  @Output() openWidthChange = new EventEmitter<any>();
  @Output() subnetChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  @ViewChild ('updateSubnetForm') updateSubnetForm: NgForm;

  subnetMasks : SubnetMask[] = [];
  subnetGroups : SubnetGroup[] = [];
  isAdd: boolean = false;

  editedIpDetail = new AddIpv4Subnet();

  constructor(private masterservice: MasterService ,private loaderService: LoadingDataService,private subnetService : SubnetService) { 
    this.getSubnetMasks();
    this.getSubnetGroups();    
  }

  ngOnInit(): void {
    console.log(this.subnet,'this.subnet');
  }

  getSubnetMasks() {
    this.masterservice.getSubnetMask().subscribe((data) => {
      if(data) {
        this.subnetMasks = data;
      }
    })
  } 

  getSubnetGroups() {
    this.masterservice.getSubnetGroups().subscribe((data) => {
      if(data) {
        this.subnetGroups = data;
      }
    })
  }

  addClick() {
    this.isAdd = !this.isAdd;
  }

  update() {
    this.loaderService.showLoader();
    
    Object.assign(this.editedIpDetail, this.subnet, this.updateSubnetForm.value);        

    this.subnetService.updateSubnetDetail(this.editedIpDetail).subscribe((data) => {   
      if(data) {
        //Object.assign(this.subnet, data);
        this.loaderService.hideLoader();
        this.onCancel();     
      }   
    });
  }

  onCancel() {
    this.closeWidth.emit(0);
  }

}
