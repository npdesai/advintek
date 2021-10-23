import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { SubnetService } from 'src/app/ipam/services/subnet.service';

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

  credentials: any;
  ipAvailabilities: any;
  reservedStatuses: any;

  constructor(private subnetService: SubnetService, private loaderService: LoadingDataService) { 
    this.credentials = [
      { name: 'None', code: 'None' },
    ];
    this.ipAvailabilities = [
      { name: 'Used', code: 'Used'},
      { name: 'Transient', code: 'Transient'},
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
    this.closeWidth.emit(this.ipDetail);
  }

  onUpdate(){   
    this.loaderService.showLoader();
    if(this.ipDetail.statusMaster){
      this.ipDetail.status = this.ipDetail.statusMaster.name;
      console.log(this.ipDetail)
    }

    if(this.ipDetail.reservedStatusMaster){
      this.ipDetail.reservedStatus = this.ipDetail.reservedStatusMaster.name;
      console.log(this.ipDetail)
    }

    this.subnetService.updateSubnetIpDetail(this.ipDetail).subscribe((data) => {      
      this.loaderService.hideLoader();
      this.onCancel();     
    });
  }

}
