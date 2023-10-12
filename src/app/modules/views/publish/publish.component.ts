import { Component,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class PublishComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    console.log(this.data)
  }
}
