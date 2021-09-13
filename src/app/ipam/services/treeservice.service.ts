import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeserviceService {
  constructor(private http: HttpClient) {}

  getTreeData() {
    return this.http
      .get<any>('../../../utilities/tree_data.json')
      .toPromise()
      .then((res) => <TreeNode[]>res.data);
  }
}
