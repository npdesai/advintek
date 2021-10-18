import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubnetGroup, SubnetMask } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  rootControler: string = `${environment.apiUrl}/api/Master`;

  constructor(private http: HttpClient) {}

  getSubnetGroups() {
    return this.http.get<SubnetGroup[]>(`${this.rootControler}/SubnetGroups`);
  }

  getSubnetMask() {
    return this.http.get<SubnetMask[]>(`${this.rootControler}/SubnetMasks`);
  }
}
