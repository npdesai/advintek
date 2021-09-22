import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DHCPScope } from '../models/DHCPScope';
import { DHCPSummary } from '../models/DHCPSumary';

@Injectable({
  providedIn: 'root',
})
export class DHCPserviceService {
  constructor(private http: HttpClient) {}

  getDHCPSummary(dhcpId: any) {
    return this.http
      .get<any>('../../../utilities/DHCPSummary_data.json')
      .toPromise()
      .then((res) => <DHCPSummary[]>res.data);
  }

  getDHCPScopeDetail(dhcpId: any) {
    return this.http
    .get<any>('../../../utilities/DHCPScope_data.json')
    .toPromise()
    .then((res)=> <DHCPScope[]>res.data);
  }
  
}
