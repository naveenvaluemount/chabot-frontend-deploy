import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { ApiService } from 'app/core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations   : fuseAnimations
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  signInForm:any;
  signUpForm:any;
  showAlert: boolean = false;
  signupDailogRef: any;

  constructor(
      private route: ActivatedRoute,
      private api: ApiService,
      private fb:FormBuilder,
      private router: Router,
      public dailog: MatDialog,
      private snackbar: MatSnackBar
  ){
    
  }
  ngOnInit(): void {
    this.api.signedInRedirect(this.api.userData);
    this.signInForm = this.fb.group({
      userName     : ['', [Validators.required, Validators.email]],
      password  : ['', Validators.required], 
  });
  }

  register(){
    if(!this.signUpForm.invalid){
      let sendObj = Object.assign({});
      sendObj.firstname = this.signUpForm.value.firstname;
      sendObj.lastname = this.signUpForm.value.lastname;
      sendObj.username = this.signUpForm.value.username;
      sendObj.email = this.signUpForm.value.email;
      sendObj.password = this.signUpForm.value.password;
      this.api.register(sendObj).subscribe(response=>{
        console.log(response)
        if(response.statusCode === 200){
          if(response.statusCode === 200){
            this.signupDailogRef.close();
          }
        }
        
    
      })
  
      }else{
         
      }
  }

  signIn(){
    if(!this.signInForm.invalid){
    let sendObj = Object.assign({});
    sendObj.email = this.signInForm.value.userName;
    sendObj.password = this.signInForm.value.password;
    this.api.login(sendObj).subscribe(response=>{
      if(response.statusCode === 200){
        this.api.signedInRedirect(response.response);
        console.log(response.response);
        localStorage.setItem("data", JSON.stringify(response.response));
        this.snackbar.open(response.message ? response.message : 'Success.',null, { duration: 3000, panelClass:'snackbar-success' });
          // this.signInForm.reset();
          // this.api.signedInRedirect('SUPERADMIN');
      } else {
        this.snackbar.open(response.message ? response.message : 'Something went wrong..',null, { duration: 3000, panelClass:'snackbar-error' });
      }
      
  
    })

    }else{
       
    }

   

  }

  signUp(data: any){
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupDailogRef = this.dailog.open(data, { width: '550px'});

  }

    close(){
      this.signupDailogRef.close();
    }
}
