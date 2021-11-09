import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubnetMask, SubnetGroup } from 'src/app/ipam/models/master';
import { MasterService } from 'src/app/ipam/services/master.service';

@Component({
  selector: 'app-update-subnet',
  templateUrl: './update-subnet.component.html',
  styleUrls: ['./update-subnet.component.css']
})
export class UpdateSubnetComponent implements OnInit {
  @Input() openWidth = 0;
  @Input() subnet : any;
  @Output() openWidthChange = new EventEmitter<any>();
  @Output() subnetChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  @ViewChild ('updateSubnetForm') updateSubnetForm: NgForm;

  subnetMasks : SubnetMask[] = [];
  subnetGroups : SubnetGroup[] = [];
  isAdd: boolean = false;

  constructor(private masterservice: MasterService) { 
    this.getSubnetMasks();
    this.getSubnetGroups();
  }

  ngOnInit(): void {
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

  update() {}

  onCancel() {
    this.closeWidth.emit(0);
  }

}
