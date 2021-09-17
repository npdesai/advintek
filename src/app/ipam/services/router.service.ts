import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private http: HttpClient) { }

  getRoutersData() {
    return this.http
      .get<any>('../../../utilities/router_data.json')
      .toPromise()
      .then((res) => <Router[]>res.data);
  }
}
