import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { IpDetail } from '../../models/ipDetail';
import { IpHistory } from '../../models/ipHistory';
import { Subnet } from '../../models/subnet';
import { Ipv6Service } from '../../services/ipv6.service';
import { SubnetService } from '../../services/subnet.service';

@Component({
  selector: 'app-ipv6',
  templateUrl: './ipv6.component.html',
  styleUrls: ['./ipv6.component.css']
})
export class Ipv6Component implements OnInit {
  subnets: Subnet[] = [];
  ipDetails: IpDetail[] = [];
  ipHistories: IpHistory[] = [];
  statusMessage: string = "";

  cmenuitems: MenuItem[];
  pageTitle: string;
  width = 0;
  selectedIpDetail: IpDetail = new IpDetail();

  eChartOptions: any;
  eChartOptions2: any;

  constructor(private ipv6Service: Ipv6Service) { 
    this.eChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Not Reachable',
            itemStyle: {
              color: '#6c757d'
            }
          },
          {
            icon: 'circle',
            name: 'Available',
            itemStyle: {
              color: '#28a745'
            }
          },
          {
            icon: 'circle',
            name: 'Quarantine',
            itemStyle: {
              color: '#ffc107'
            }
          },
          {
            icon: 'circle',
            name: 'Used',
            itemStyle: {
              color: '#dc3545'
            }
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { 
              value: 200, 
              name: 'Not Reachable',
              itemStyle: {
                color: '#6c757d'
              }
            },
            { 
              value: 535, 
              name: 'Available',
              itemStyle: {
                color: '#28a745'
              } 
            },
            { 
              value: 125, 
              name: 'Quarantine',
              itemStyle: {
                color: '#ffc107'
              }
            },
            { 
              value: 335, 
              name: 'Used',
              itemStyle: {
                color: '#dc3545'
              } 
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    this.eChartOptions2 = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Success',
          },
          {
            icon: 'circle',
            name: 'Rev. Lookup Failed',
          },
          {
            icon: 'circle',
            name: 'Fwd. Lookup Failed',
          },
          {
            icon: 'circle',
            name: 'N/A',
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Success' },
            { value: 735, name: 'Rev. Lookup Failed' },
            { value: 0, name: 'Fwd. Lookup Failed' },
            { value: 0, name: 'N/A' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getSubnetData();
    this.getIpDetails();
    this.getIpHistories();
  }

  getSubnetData() {
    this.statusMessage = "Loading data...";
    this.ipv6Service.getSubnets(4).then((data) => {
      this.subnets = data;
    });
  }

  getIpDetails() {
    this.statusMessage = "Loading data...";
    this.ipv6Service.getSubnetIps("49.256.25.0").subscribe((data) => {
      this.ipDetails = data;
    })
  }

  getIpHistories() {
    this.statusMessage = "Loading data...";
    this.ipv6Service.getIpHistories(4).then((data) => {
      this.ipHistories = data;
    })
  }

  testIP(ip) {
    this.pageTitle = ip.item.label;
    this.width = 100;
  }

  openCM(event: MouseEvent, contextMenu: ContextMenu, ipDetail: IpDetail) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedIpDetail = ipDetail;
    contextMenu.show(event);
    return false;
  }

  closeDiv(width) {
    this.selectedIpDetail = new IpDetail();
    this.width = width;
  }


}
