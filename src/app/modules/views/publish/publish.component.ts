import { Component,Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/core/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class PublishComponent implements OnInit {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private service: ApiService, private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    
  }

  publish(data: any){
    if(!data.status){
      this.service.publish(this.data.id).subscribe((data: any)=>{
        if (data.statusCode === 200) {
          this.snackbar.open('Organization Published', null, { duration: 1000 });
          this.dialog.closeAll();
        }else{
          this.snackbar.open(data.errMsg, null, { duration: 1000 });
        }
      });
    } else if (data.status) {
      this.service.unPublish(this.data.id).subscribe((data: any)=>{
        if (data.statusCode === 200) {
          this.snackbar.open('Organization UnPublished', null, { duration: 1000 });
          this.dialog.closeAll();
        }else{
          this.snackbar.open(data.errMsg, null, { duration: 1000 });
        }
      });
    }
  };
}
