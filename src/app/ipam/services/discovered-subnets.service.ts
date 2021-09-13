import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscoveredSubnets } from '../models/DiscoveredSubnets';

@Injectable({
  providedIn: 'root'
})
export class DiscoveredSubnetsService {

  constructor(private http: HttpClient) { }

  getDiscoveredSubnets(dhcpId: any) {
    return this.http
      .get<any>('../../../utilities/DiscoveredSubnets_data.json')
      .toPromise()
      .then((res) => <DiscoveredSubnets[]>res.data);
  }
}
