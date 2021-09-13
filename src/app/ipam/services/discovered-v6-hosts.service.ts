import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discoveredv6Hosts } from '../models/DiscoveredV6Hosts';

@Injectable({
  providedIn: 'root'
})
export class DiscoveredV6HostsService {

  constructor(private http: HttpClient) { }

  getDiscoveredV6Hosts(dv6hId: any) {
    return this.http
      .get<any>('../../../utilities/DiscoveredV6Hosts_data.json')
      .toPromise()
      .then((res) => <Discoveredv6Hosts[]>res.data);
  }
}
