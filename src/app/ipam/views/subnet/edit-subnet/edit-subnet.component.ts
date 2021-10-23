import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { 
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
    this.closeWidth.emit(0);
  }

  onUpdate(){
    console.log(this.ipDetail)
  }

}
