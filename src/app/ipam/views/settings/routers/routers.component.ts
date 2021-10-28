import { Component, OnInit } from '@angular/core';
import { Router } from 'src/app/ipam/models/router';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';
import { RouterService } from 'src/app/ipam/services/router.service';
import { SettingService } from 'src/app/ipam/services/setting.service';

@Component({
  selector: 'app-routers',
  templateUrl: './routers.component.html',
  styleUrls: ['./routers.component.css'],
})
export class RoutersComponent implements OnInit {
  routers: Router[] = [];
  selectedRouters = [];
  statusMessage: string = '';
  width = 100;

  constructor(private routerService: RouterService, private settingService: SettingService, private loaderService: LoadingDataService) {}

  ngOnInit(): void {
    this.getRouterData();
  }

  onAddDeviceClick() {
    this.width = 100;
  }

  closeAddDevice(width) {
    this.width = width;
  }

  onDelete() {
    if(this.selectedRouters.length > 0) {
      this.loaderService.showLoader();
      this.settingService.deleteRouters(this.selectedRouters).subscribe((data) => {
        if(data) {
          this.routers = this.routers.filter((router) => {
            return this.selectedRouters.indexOf(router.deviceId) < 0;
          });
          this.selectedRouters.splice(0, this.selectedRouters.length);
          this.loaderService.hideLoader();
        }
      })
    } else {
      alert('Please Select atleast 1 Router!');
    }
  }

  routerRowChkBoxHandler(e) {
    if(e.target.checked) {
      this.selectedRouters.push(e.target.value);
    } else {
      this.selectedRouters.splice(this.selectedRouters.indexOf(e.target.value), 1);
    }
  }

  getRouterData() {
    this.loaderService.showLoader();
    this.statusMessage = 'Loading data...';
    if(this.routers.length === 0) {
      this.statusMessage = "No Data Found!";
    }
    this.routerService.getRoutersData().subscribe((data) => {
      if(data) {
        this.routers = data;
        this.loaderService.hideLoader();
      }
    });
  }
}
