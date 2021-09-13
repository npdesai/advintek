import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BreadcrumbServiceService {
  private crumbs: Subject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;

  constructor() {
    this.crumbs = new Subject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map((item) =>
        Object.assign({}, item, {
          routerLinkActiveOptions: { exact: true },
        })
      )
    );
  }
}
