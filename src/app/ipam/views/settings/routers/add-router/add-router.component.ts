import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-router',
  templateUrl: './add-router.component.html',
  styleUrls: ['./add-router.component.css'],
})
export class AddRouterComponent implements OnInit {
  @Input() openWidth = 0;
  @Output() openWidthChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  isAddManual: boolean = true;
  credentials: any;
  protocols: any;
  vendors: any;

  uploadedFiles: any[] = [];

  constructor() {
    this.credentials = [
      { name: '130', code: '130' },
      { name: '131', code: '131' },
    ];

    this.protocols = [
      { name: 'Telnet', code: 'Telnet' },
      { name: 'SSH', code: 'SSH' },
    ];

    this.vendors = [
      { name: 'Cisco', code: 'Cisco' },
      { name: 'HP', code: 'HP' },
      { name: 'Foundry', code: 'Foundry' },
      { name: 'Palo Alto', code: 'Palo Alto' },
      { name: 'Fortinet', code: 'Fortinet' },
    ];
  }

  ngOnInit(): void {}

  onCancel() {
    this.closeWidth.emit(0);
  }

  radioChange(event: MatRadioChange) {
    this.isAddManual = event.value === 'addmanual';
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
