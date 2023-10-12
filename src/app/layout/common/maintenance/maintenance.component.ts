import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
    applicationName: any = 'Chatbot'

    constructor(private api: ApiService, private router: Router){}

    ngOnInit(){
        this.getDeployementDate();
        setInterval(()=>{
            this.getDeployementDate();
        }, 15 * 60 * 1000);
    }

    currentYear(): number {
        return new Date().getFullYear();
    }

    getDeployementDate(): any {
        let sendObj: any = {};
        const orgId: any = JSON.parse(localStorage.getItem('organization'));
        sendObj['organizationId'] = orgId.id;
        this.api.getDeployementDate(sendObj).subscribe(
          (res) => {
            const timestamp = Number(sessionStorage.getItem('timestamp'));
              if (res?.statusCode === 200) {
                  if (res.response?.maintaincePage === false) {
                      this.router.navigate(['/manageUsers']);
                  } else {
                      if (timestamp < res.response?.deploymentDate) {
                       window.location.reload();
                      }
                  }

                  }
          }, (err) => {
            console.log(err);
          }
        );
      }
}
