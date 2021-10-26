import { Component, OnInit } from '@angular/core';
import { Router } from 'src/app/ipam/models/router';
import { RouterService } from 'src/app/ipam/services/router.service';

@Component({
  selector: 'app-routers',
  templateUrl: './routers.component.html',
  styleUrls: ['./routers.component.css'],
})
export class RoutersComponent implements OnInit {
  routers: Router[] = [];
  selectedRouters: Router[] = [];
  statusMessage: string = '';
  width = 100;

  constructor(private routerService: RouterService) {}

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
      this.routers = this.routers.filter((router) => {
        return this.selectedRouters.indexOf(router) < 0;
      });
      this.selectedRouters.splice(0, this.selectedRouters.length);
    } else {
      alert('Please Select atleast 1 Router!');
    }
  }

  routerRowChkBoxHandler(e, router) {
    if(e.target.checked) {
      this.selectedRouters.push(this.routers.find((router) => {
        return router.deviceId === e.target.value;
      }));
    } else {
      this.selectedRouters.splice(this.selectedRouters.indexOf(router), 1);
    }
  }

  getRouterData() {
    this.statusMessage = 'Loading data...';
    this.routerService.getRoutersData().subscribe((data) => {
      this.routers = data;
    });
  }
}
