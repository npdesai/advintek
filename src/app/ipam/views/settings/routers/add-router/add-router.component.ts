import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { AddRouter, Router } from 'src/app/ipam/models/router';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { SettingService } from 'src/app/ipam/services/setting.service';

@Component({
  selector: 'app-add-router',
  templateUrl: './add-router.component.html',
  styleUrls: ['./add-router.component.css'],
})
export class AddRouterComponent implements OnInit {
  @Input() routersList: Router[];
  @Input() openWidth = 0;
  @Output() openWidthChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();

  isAddManual: boolean = true;
  credentials: any;
  protocols: any;
  vendors: any;

  uploadedFiles: any[] = [];

  addRouter = new AddRouter();
  newRouter = new Router();

  constructor(private loaderService: LoadingDataService, private settingService: SettingService) {
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
    this.resetAddRouterModel();
  }

  resetAddRouterModel() {
    this.addRouter.deviceType = "";
    this.addRouter.deviceIPAddress = "";
  }

  radioChange(event: MatRadioChange) {
    this.isAddManual = event.value === 'addmanual';
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  addNewRouterToList(routerId) {
    this.newRouter.deviceId = routerId;
    this.newRouter.deviceIPAddress = this.addRouter.deviceIPAddress;
    this.newRouter.deviceType = this.addRouter.deviceType;
    this.routersList.push(this.newRouter);
  }

  onAddRouter() {
    this.loaderService.showLoader();

    this.settingService.addRouter(this.addRouter).subscribe((data) => {
      if(data) {
        this.loaderService.hideLoader();
        this.addNewRouterToList(data);
        this.onCancel();
      }
    });
  }
}
