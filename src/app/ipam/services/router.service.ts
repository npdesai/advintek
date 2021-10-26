import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  rootControler: string = `${environment.apiUrl}/api/Setting`;

  constructor(private http: HttpClient) { }

  getRoutersData() {
    return this.http.get<any>(`${this.rootControler}/Routers`);
  }
}
