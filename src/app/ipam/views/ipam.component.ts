import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  // crumbs: MenuItem[];
  items: MenuItem[];
  settingsItems: MenuItem[];
  pageTitle: string;
  width = 0;
  dnswidth = 0;
  constructor(
    private treeserviceService: TreeserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTreeData();
    // this.crumbs = [{ label: 'Your Company' }];

    this.items = [
      { label: 'Add IPv4 Subnet', command: (x) => this.addItems(x) },
      { label: 'Add IPv6 Subnet/Site', command: (x) => this.addItems(x) },
      { label: 'Add DHCP Server', command: (x) => this.addItems(x) },
    ];

    this.settingsItems = [
      { label: 'Add DNS Server', command: (x) => this.addDNSServer(x) },
      {
        label: 'Add Router',
        url: 'ipam/settings/router',
        command: (x) => this.navigateToRouter(x),
      },
    ];
  }

  getTreeData() {
    this.treeserviceService.getTreeData().subscribe((data) => {
      this.treeitems = data;
    });
  }

  addItems(x) {
    this.pageTitle = x.item.label;
    this.width = 100;
  }

  addDNSServer(x) {
    this.dnswidth = 100;
  }

  nodeSelect(event) {
    this.router.navigate([event.node.path]);
  }

  navigateToRouter(x) {
    this.router.navigate([x.item.url]);
  }

  closeDiv(width) {
    this.width = width;
    this.getTreeData();
  }

  closeDNSServer(width) {
    this.dnswidth = width;
  }
}
