import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '../shared.module';
import { IpamRouting } from './ipam.routes';
import { SubnetService } from './services/subnet.service';
import { HomeComponent } from './views/home.component';
import { IpamComponent } from './views/ipam.component';
import { SubnetComponent } from './views/subnet/subnet.component';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddComponent } from './views/add/add.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';
import {ContextMenuModule} from 'primeng/contextmenu';
import { GroupComponent } from './views/group/group.component';
import { TestIpComponent } from './views/subnet/test-ip/test-ip.component';
import { DasboardComponent } from './views/dasboard/dasboard.component';
import { DHCPSummaryComponent } from './views/DHCP/dhcp-summary/dhcp-summary.component';
import { DiscoveredSubnetsComponent } from './views/discovered/discovered-subnets/discovered-subnets.component';
import { DiscoveredV6HostsComponent } from './views/discovered/discovered-v6-hosts/discovered-v6-hosts.component';
import { AddDnsServerComponent } from './views/settings/add-dns-server/add-dns-server.component';
import { RoutersComponent } from './views/settings/routers/routers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeTableModule,
    IpamRouting,
    SharedModule,
    TreeModule,
    TabViewModule,
    BreadcrumbModule,
    SplitButtonModule,
    TableModule,
    MatButtonModule,
    MatIconModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DividerModule,
    FileUploadModule,
    ContextMenuModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    HomeComponent,
    IpamComponent,
    SubnetComponent,
    AddComponent,
    GroupComponent,
    TestIpComponent,
    DasboardComponent,
    DHCPSummaryComponent,
    DiscoveredSubnetsComponent,
    DiscoveredV6HostsComponent,
    AddDnsServerComponent,
    RoutersComponent
  ],
  providers: [
    SubnetService
  ]
})
export class IpamModule { }
