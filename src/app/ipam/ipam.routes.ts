import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpamModule } from './ipam.module';
import { DasboardComponent } from './views/dasboard/dasboard.component';
import { DHCPSummaryComponent } from './views/DHCP/dhcp-summary/dhcp-summary.component';
import { DiscoveredSubnetsComponent } from './views/discovered/discovered-subnets/discovered-subnets.component';
import { DiscoveredV6HostsComponent } from './views/discovered/discovered-v6-hosts/discovered-v6-hosts.component';
import { GroupComponent } from './views/group/group.component';
import { HomeComponent } from './views/home.component';
import { IpamComponent } from './views/ipam.component';
import { RoutersComponent } from './views/settings/routers/routers.component';
import { SubnetComponent } from './views/subnet/subnet.component';

export const ipamRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IpamComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: DasboardComponent },
          { path: 'groups/:Id', component: GroupComponent },
          { path: 'subnets/:Id', component: SubnetComponent },
          { path: 'DHCPSummary/:Id', component: DHCPSummaryComponent },
          { path: 'discovered', children: [
            { path: 'subnets', component: DiscoveredSubnetsComponent },
            { path: 'v6hosts', component: DiscoveredV6HostsComponent }
          ] },
          { path: 'settings', children: [
            { path: 'router', component: RoutersComponent }
          ] },
          { path: '**', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
    ],
  },
];

export const IpamRouting: ModuleWithProviders<IpamModule> = RouterModule.forChild(ipamRoutes);
