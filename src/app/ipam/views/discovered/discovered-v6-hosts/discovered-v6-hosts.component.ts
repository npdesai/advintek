import { Component, OnInit } from '@angular/core';
import { Discoveredv6Hosts } from 'src/app/ipam/models/DiscoveredV6Hosts';
import { DiscoveredV6HostsService } from 'src/app/ipam/services/discovered-v6-hosts.service';

@Component({
  selector: 'app-discovered-v6-hosts',
  templateUrl: './discovered-v6-hosts.component.html',
  styleUrls: ['./discovered-v6-hosts.component.css']
})
export class DiscoveredV6HostsComponent implements OnInit {
  statusMessage: string = '';
  discoveredV6Hosts: Discoveredv6Hosts[] = [];
  eChartOptions: any;
  eChartOptionsLocal: any;

  constructor(private discoveredV6HostsService: DiscoveredV6HostsService) {
    this.eChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Used',
          },
          {
            icon: 'circle',
            name: 'Transient',
          },
          {
            icon: 'circle',
            name: 'Available',
          },
          {
            icon: 'circle',
            name: 'Not Scanned',
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 200, name: 'Used' },
            { value: 535, name: 'Transient' },
            { value: 0, name: 'Available' },
            { value: 0, name: 'Not Scanned' },
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
    this.eChartOptionsLocal = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Used',
          },
          {
            icon: 'circle',
            name: 'Transient',
          },
          {
            icon: 'circle',
            name: 'Available',
          },
          {
            icon: 'circle',
            name: 'Not Scanned',
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 200, name: 'Used' },
            { value: 535, name: 'Transient' },
            { value: 300, name: 'Available' },
            { value: 170, name: 'Not Scanned' },
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
    this.getDiscoveredV6HostsData();
  }

  getDiscoveredV6HostsData(){
    this.statusMessage = 'Loading Data...';
    this.discoveredV6HostsService.getDiscoveredV6Hosts(4).then((data) => {
      this.discoveredV6Hosts = data;
    })
  }

}
