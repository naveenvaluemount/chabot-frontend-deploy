import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'flex flex-col flex-auto p-8 justify-center items-center1' }
})
export class DashboardComponent {
  organizations: any;
  user = this.api.userData;
  constructor(private api: ApiService, private router: Router, private route:ActivatedRoute) {
    // static data
    this.organizations = [
      {
        id:1,
        cllientName: 'Test'
      }
    ]


    this.route.data.subscribe(data=>{ 
      this.organizations = this.api.getResp(data.organizations)
    })

 
    
  }
}
