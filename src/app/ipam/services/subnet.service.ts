import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, SortOrder } from '../../common/models/requestOptions';
import { ServiceResponse } from '../../common/models/serviceResponse';
import { IpDetail } from "../models/ipDetail";
import { Subnet } from "../models/subnet";

@Injectable()
export class SubnetService {

  rootControler: string = `/Subnets`;

  constructor(private http: HttpClient) { }

  getSubnets(groupId:any) {

    // if (requestOptions == null)
    //   requestOptions = {
    //     fields: ['Id', 'Address', 'Mask'],
    //     sortElement: {
    //       propertyName: "Number",
    //       sortOrder: SortOrder.ascending
    //     }
    //   };

    // return this.http.post<ServiceResponse>(`${this.rootControler}/GetSubnets`, requestOptions);

    return this.http
    .get<any>('../../../utilities/subnet_data.json')
    .toPromise()
    .then((res) => <Subnet[]>res.data);
  }

  getSubnetIps(subnetId:any) {
    return this.http
    .get<any>('../../../utilities/subnetIP_data.json')
    .toPromise()
    .then((res) => <IpDetail[]>res.data);
  }

  downloadSubnets(requestOptions?: RequestOptions) {
    return this.http.post(`${this.rootControler}/DownloadSubnets`, requestOptions, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  getSubnet(id: string): Observable<ServiceResponse> {

    const params = new HttpParams()
      .set('id', id == null ? "" : id.trim());

    return this.http.get<ServiceResponse>(`${this.rootControler}/GetSubnet`, { params });
  }

  async checkNumberExists(number: string): Promise<ServiceResponse> {

    const params = new HttpParams()
      .set('number', number == null ? "" : number.trim());

    return await this.http.get<ServiceResponse>(`${this.rootControler}/CheckNumberExists`, { params }).toPromise();
  }

  save(subnet: Subnet): Observable<ServiceResponse> {

    return this.http.post<ServiceResponse>(`${this.rootControler}/Save`, subnet);
  }

  delete(id: string): Observable<ServiceResponse> {

    const params = new HttpParams()
      .set('id', id == null ? "" : id.trim());

    return this.http.delete<ServiceResponse>(`${this.rootControler}/Delete`, { params });
  }

}
