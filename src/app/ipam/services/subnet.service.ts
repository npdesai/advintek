import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { RequestOptions, SortOrder } from '../../common/models/requestOptions';
import { ServiceResponse } from '../../common/models/serviceResponse';
import { IpDetail } from "../models/ipDetail";
import { IpHistory } from "../models/ipHistory";
import { IpPing } from "../models/ipPing";
import { AddIpv4Subnet, AddIpv6Subnet, Subnet } from "../models/subnet";

@Injectable()
export class SubnetService {

  rootControler: string = `${environment.apiUrl}/api/Subnet`;

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

    return this.http.get<any>(`${this.rootControler}/GetSubnetListByGroupId?subnetGroupId=${groupId}`);
  }

  getSubnetIps(subnetid:string) {
    const params = new HttpParams()
    .set('subnetId', subnetid == null ? "" : subnetid.trim());
    
    return this.http.get<any>(`${this.rootControler}/SubnetIpList`,{params});    
  }

  scanIP(subnetIpId:string) {
    return this.http.patch<any>(`${this.rootControler}/ScanIP?subnetIpId=${subnetIpId}`,"");
  }

  traceIpRoute(tracedIpId: string) {
    return this.http.get<any>(`${this.rootControler}/TraceRoute?ipAddress=${tracedIpId}`);
  }

  updateSubnetIpDetail(subnetIpDetail:Subnet) {
    return this.http.patch<any>(`${this.rootControler}/UpdateIPById`,subnetIpDetail);
  }

  getIpHistories(subnetId:any) {
    const params = new HttpParams()
      .set('subnetId', subnetId == null ? "" : subnetId.trim());
      
    return this.http.get<IpHistory[]>(`${this.rootControler}/GetSubnetHistory`,{params});    
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

  saveIPV4Subnet(addSubnet: AddIpv4Subnet): Observable<boolean> {
    return this.http.post<any>(`${this.rootControler}/Add`, addSubnet);
  }

  saveIPV6Subnet(addSubnet: AddIpv6Subnet): Observable<boolean> {
    return this.http.post<any>(`${this.rootControler}/AddIPV6`, addSubnet);
  }

  getIpPing(subnetIp: string): Observable<IpPing> {
    const params = new HttpParams()
      .set('ipAddress', subnetIp == null ? "" : subnetIp.trim());
      
    return this.http.get<IpPing>(`${this.rootControler}/Ping`,{params});
  }

  getSubnetCompanies(): Observable<any> {
    return this.http.get(`${this.rootControler}`)
  }

  getSubnetDetail(subnetId: string): Observable<any> {
    const params = new HttpParams()
      .set('subnetId', subnetId == null ? "" : subnetId.trim());
      
    return this.http.get<any>(`${this.rootControler}/GetSubnetDetailBySubnetId`,{params});
  }

  getSubnetSummary(subnetId: string): Observable<any> {
    const params = new HttpParams()
      .set('subnetId', subnetId == null ? "" : subnetId.trim());
      
    return this.http.get<any>(`${this.rootControler}/GetSubnetSummary`,{params});
  }

  updateSubnetDetail(subnetIpDetail:AddIpv4Subnet) {
    return this.http.patch<any>(`${this.rootControler}/Update`,subnetIpDetail);
  }

}
