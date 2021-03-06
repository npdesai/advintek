import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddRouter } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  rootControler: string = `${environment.apiUrl}/api/Setting`;

  constructor(private http: HttpClient) { }

  addRouter(router: AddRouter) {
    return this.http.post<any>(`${this.rootControler}/AddRouter`, router);
  }  

  deleteRouters(routers: any): Observable<any> {
    return this.http.delete<any>(`${this.rootControler}/DeleteRouters`, {
      body: routers
    });
  }
}
