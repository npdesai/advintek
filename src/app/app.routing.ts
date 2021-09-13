import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "ipam", pathMatch: "full" },
  {
    path: "ipam",
    loadChildren: () => import("./ipam/ipam.module").then(a => a.IpamModule)
  },
  { path: '**', redirectTo: "home", pathMatch: "full" }
];

export const AppRouting = RouterModule.forRoot(routes);
