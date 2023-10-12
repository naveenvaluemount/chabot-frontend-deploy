import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup = this.fb.group({
    newPassword: ["", [Validators.required]],
    confirmPassword: ["", [Validators.required]],

  });
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb:FormBuilder,
    private router: Router
){}
}
