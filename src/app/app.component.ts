import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './core/api.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{

    timestamp: any;
    /**
     * Constructor
     */
    constructor(private api:ApiService, private router: Router){}
    ngOnInit(): void {
      

          // this.timestamp = new Date().getTime();
          // localStorage.setItem('timestamp', this.timestamp);

          // this.getDeployementDate();
          // setInterval(() => {  
          //   this.getDeployementDate();
          // }, 15 * 60 * 1000);
    }


    getDeployementDate(): any {

        let sendObj: any = {};
        const orgId: any = JSON.parse(localStorage.getItem('organization'));
        sendObj['organizationId'] = orgId.id ? orgId.id : null;

        this.api.getDeployementDate(sendObj).subscribe(
          (res) => {
            const timestamp = Number(localStorage.getItem('timestamp'));
              if (res?.statusCode === 200) {
                  if (res.response?.maintaincePage) {
                    this.router.navigate(['/maintenance'])
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
