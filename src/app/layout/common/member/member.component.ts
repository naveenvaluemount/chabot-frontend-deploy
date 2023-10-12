import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @ViewChild("changePasswordTemp") changePasswordTemp:TemplateRef<any>;
  @ViewChild("showProfileTemp") showProfileTemp:TemplateRef<any>;
  user:any;
  form: FormGroup;
  profileDetails: any;
  constructor( private api:ApiService, private router:Router, public dialog: MatDialog, private fb:FormBuilder,  private snackbar: MatSnackBar,){

  }
ngOnInit(): void {
 this.user = this.api.userData;
 this.profileDetails = JSON.parse(localStorage.getItem('userData'));
}
signOut(){
this.api.logout()
}
changePassword(){
    this.form =  this.fb.group({
        oldPassword: ["", [Validators.required]],
        newPassword: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
      });
    this.dialog.open(this.changePasswordTemp, { width: '400px'})
}
updatePassword(){
    this.api.changePassword(this.form.value).subscribe((res: any)=>{
        if(res.response.statusCode === 200){
            this.snackbar.open('Password updated', null, { duration: 1000 })
        }
    })
}

showProfile(){
    this.dialog.open(this.showProfileTemp, {width: '400px'})
}
close(){
    this.dialog.closeAll()
}

}
