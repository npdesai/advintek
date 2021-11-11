import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent implements OnInit {
  // chartOptions: any;
  eChartOptions: any;
  // eChartOptions2: any;
  eChartOptionsForBar: any;

  constructor() {
    // this.chartOptions = [
    //   { name: 'DNS Status', code: 'CH1' },
    //   { name: 'Reserved IPs', code: 'CH2' },
    //   { name: 'Authenticity Status', code: 'CH3' },
    //   { name: 'NIC Type', code: 'CH4' },
    //   { name: 'Device Type', code: 'CH5' },
    //   { name: 'AD Status', code: 'CH6' },
    // ];

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

    // this.eChartOptions2 = {
    // //   tooltip: {
    // //     trigger: 'item',
    // //   },
    // //   legend: {
    // //     bottom: 'bottom',
    // //     data: [
    // //       {
    // //         icon: 'circle',
    // //         name: 'Success',
    // //       },
    // //       {
    // //         icon: 'circle',
    // //         name: 'Rev. Lookup Failed',
    // //       },
    // //       {
    // //         icon: 'circle',
    // //         name: 'Fwd. Lookup Failed',
    // //       },
    // //       {
    // //         icon: 'circle',
    // //         name: 'N/A',
    // //       },
    // //     ],
    // //   },
    // //   series: [
    // //     {
    // //       type: 'pie',
    // //       radius: '50%',
    // //       data: [
    // //         { value: 1048, name: 'Success' },
    // //         { value: 735, name: 'Rev. Lookup Failed' },
    // //         { value: 0, name: 'Fwd. Lookup Failed' },
    // //         { value: 0, name: 'N/A' },
    // //       ],
    // //       emphasis: {
    // //         itemStyle: {
    // //           shadowBlur: 10,
    // //           shadowOffsetX: 0,
    // //           shadowColor: 'rgba(0, 0, 0, 0.5)',
    // //         },
    // //       },
    // //     },
    // //   ],
    // };

    this.eChartOptionsForBar = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: [
          '172.21.146.0',
          '172.21.145.1',
          '172.21.146.2',
          '172.21.149.3',
          '172.21.146.4',
          '172.21.148.5',
          '172.21.146.6',
          '172.21.146.7',
          '172.21.146.8',
          '172.21.146.9',
          '172.21.146.10',
          '172.21.146.11',
        ],
        axisLabel: {
          interval: 0,
          rotate: 25
        }
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        bottom: 'bottom',
        data: [
          {
            icon: 'circle',
            name: 'Used',
            itemStyle: {
              color: '#dc3545'
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
            name: 'Available',
            itemStyle: {
              color: '#28a745'
            } 
          },
          {
            icon: 'circle',
            name: 'Not Reachable',
            itemStyle: {
              color: '#6c757d'
            }
          },
        ],
      },
      series: [
        {
          name: 'Used',
          data: [192, 242, 229, 248, 209, 101, 221, 216, 209, 237, 214, 219],
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: '#dc3545'
          }
        },
        {
          name: 'Quarantine',
          data: [62, 12, 25, 6, 45, 153, 33, 38, 45, 17, 40, 35],
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: '#ffc107'
          }
        },
        {
          name: 'Available',
          data: [192, 242, 229, 248, 209, 101, 221, 216, 209, 237, 214, 219],
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: '#28a745'
          } 
        },
        {
          name: 'Not Reachable',
          data: [62, 12, 25, 6, 45, 153, 33, 38, 45, 17, 40, 35],
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: '#6c757d'
          }
        },
      ],
    };
  }

  ngOnInit(): void {}
}
