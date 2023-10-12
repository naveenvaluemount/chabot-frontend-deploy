import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class OrgResolver implements Resolve<any> {
  constructor(private api: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.api.allOrgs({}).pipe(map((data: any) => {
      let { response: { response, count } } = data;
      return { response, count }
    }))
  }
}
