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

  getRouterData() {
    this.statusMessage = 'Loading data...';
    this.routerService.getRoutersData().subscribe((data) => {
      this.routers = data;
    });
  }
}
