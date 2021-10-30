import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Domain } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  rootControler: string = `${environment.apiUrl}/api/Domain`;

  constructor( private http: HttpClient ) { }

  getDomainList(){
    return this.http.get<any>(`${this.rootControler}/DomainList`);
  }

  addDomain(domain: Domain) {
    return this.http.post<any>(`${this.rootControler}/AddDomain`, domain);
  }

  updateDomain(domain: Domain) {
    return this.http.patch<any>(`${this.rootControler}/UpdateDomain`, domain);
  }

  deleteDomain(domainId: string) {
    return this.http.delete<any>(`${this.rootControler}/DeleteDomain?domainId=${domainId}`);
  }
}
