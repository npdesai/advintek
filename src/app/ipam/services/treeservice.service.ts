import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeserviceService {

  rootControler: string = `${environment.apiUrl}/api/Subnet`;

  constructor(private http: HttpClient) {}

  getTreeData() {
    return this.http.get<any>(`${this.rootControler}/getsubnettree`);
  }
}
