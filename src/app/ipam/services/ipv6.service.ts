import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IpHistory } from '../models/ipHistory'; // change this model after api created
import { Subnet } from '../models/subnet'; // change this model after api created

@Injectable({
  providedIn: 'root'
})
export class Ipv6Service {
  rootControler: string = `${environment.apiUrl}/api/Subnet`;

  constructor(private http: HttpClient) { }

  getSubnets(groupId:any) {
    return this.http
    .get<any>('../../../utilities/subnet_data.json')
    .toPromise()
    .then((res) => <Subnet[]>res.data);
  }

  getSubnetIps(subnetid:string) {
    return this.http.get<any>(`${this.rootControler}/SubnetIpList?subnetId=${subnetid}`);
  }

  getIpHistories(subnetId:any) {
    return this.http
    .get<any>('../../../utilities/subnetIpHistory_data.json')
    .toPromise()
    .then((res) => {
      console.log("json data", res.data);
      return <IpHistory[]>res.data;
    });
  }
}
