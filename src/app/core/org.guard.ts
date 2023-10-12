import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Resolve, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrgGuard implements CanActivate,Resolve<any>{
  organizations:any;
  constructor(private api:ApiService, private router :Router){}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

 

      return this.api.allOrgs({}).pipe(map((data:any)=>{
        let {response:{response,count}} = data;
        this.organizations = data;
       
        if(count == 1){
          this.router.navigate(['admin/organizations',response[0].id])
          return false;
  
        }else{
          return true;
        }

       
      }))
    
  
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.organizations
  }
}
