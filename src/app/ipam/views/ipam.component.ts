import { Component,EventEmitter,Input, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { TreeserviceService } from '../services/treeservice.service';

declare var $: any;

@Component({
  selector: 'ipam',
  templateUrl: './ipam.component.html',
  styleUrls: ['./ipam.component.css'],
})
export class IpamComponent {
  treeitems: TreeNode[];
  selectedFile: TreeNode;
  crumbs: MenuItem[];
  items: MenuItem[];
  settingsItems: MenuItem[];
  pageTitle: string;
  width = 0;
  constructor(private treeserviceService: TreeserviceService, private router:Router) {}

  ngOnInit() {
    this.getTreeData();
    this.crumbs = [
      { label: 'Your Company' }
    ];

    this.items = [
      { label: 'Add IPv4 Subnet', command: (x) => this.addItems(x) },
      { label: 'Add IPv6 Subnet/Site', command: (x) => this.addItems(x) },
      { label: 'Add DHCP Server', command: (x) => this.addItems(x) },
    ];

    this.settingsItems = [
      { label: 'Add DNS Server', command: (x) => this.addItems(x) },
      { label: 'Add Router', command: (x) => this.addItems(x) }
    ];
  }

  getTreeData() {
    this.treeserviceService.getTreeData().then((data) => {
      this.treeitems = [
        {
          label: 'Your Company',
          icon: 'pi pi-globe',
          expanded: true,
          children: data,
        },
      ];
    });
  }

  addItems(x) {
    console.log('calll', x, x.item.label);
    this.pageTitle = x.item.label;
    //$('.float-box').toggleClass('float-box-hide');
    //$('#myModal2').modal('show');
    this.width = 100;
  }

  nodeSelect(event) {
    this.router.navigate([event.node.path]);    
   }

  closeDiv(width) {
    this.width = width;
  }
}
