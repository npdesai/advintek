import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubnetGroup, SubnetMask } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  rootControler: string = `${environment.apiUrl}/api/Company`;

  constructor(private http: HttpClient) {}

  getSubnetCompanies() {
    return this.http.get<SubnetGroup[]>(`${this.rootControler}/Companies`);
  }
}