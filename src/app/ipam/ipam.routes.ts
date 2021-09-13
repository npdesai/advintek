import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpamModule } from './ipam.module';
import { DasboardComponent } from './views/dasboard/dasboard.component';
import { DHCPSummaryComponent } from './views/DHCP/dhcp-summary/dhcp-summary.component';
import { GroupComponent } from './views/group/group.component';
import { HomeComponent } from './views/home.component';
import { IpamComponent } from './views/ipam.component';
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
          { path: '**', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
    ],
  },
];

export const IpamRouting: ModuleWithProviders<IpamModule> = RouterModule.forChild(ipamRoutes);
