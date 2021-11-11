import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { SubnetService } from 'src/app/ipam/services/subnet.service';
import { IpDetail } from '../../../models/ipDetail';

@Component({
  selector: 'app-edit-subnet',
  templateUrl: './edit-subnet.component.html',
  styleUrls: ['./edit-subnet.component.css']
})
export class EditSubnetComponent implements OnInit {
  @Input() openWidth = 0;
  @Output() openWidthChange = new EventEmitter<any>();  
  @Input() ipDetail: any;
  @Output() ipDetailChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  @ViewChild('editipform') editIpForm : NgForm;

  credentials: any;
  ipAvailabilities: any;
  reservedStatuses: any;
  editedIpDetail: any = new IpDetail();
  
  constructor(private subnetService: SubnetService, private loaderService: LoadingDataService) { 
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
  }
  
  ngOnInit(): void {        
  }

  onCancel() {
    this.closeWidth.emit(0);
  }

  onUpdate(){   
    this.loaderService.showLoader();
    
    Object.assign(this.editedIpDetail, this.ipDetail, this.editIpForm.value);

    this.subnetService.updateSubnetIpDetail(this.editedIpDetail).subscribe((data) => {   
      if(data) {
        Object.assign(this.ipDetail, data);
        this.loaderService.hideLoader();
        this.onCancel();     
      }   
    });
  }

}
