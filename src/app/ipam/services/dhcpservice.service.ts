import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
