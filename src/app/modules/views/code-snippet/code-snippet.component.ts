import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';  

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class CodeSnippetComponent {
constructor(private snackbar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }
copyFn(code: any) { 
    navigator.clipboard.writeText(code?.code).then(() => {
      this.snackbar.open('Code Coppied!', null, { duration: 1000 })
    });
  }
}
