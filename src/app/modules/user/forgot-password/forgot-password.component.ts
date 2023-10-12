import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form = this.fb.group({
    email     : ['', [Validators.required, Validators.email]]
})
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb:FormBuilder,
    private router: Router
){}
}
