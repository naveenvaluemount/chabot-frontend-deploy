import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  host:{class:'flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0'}
})
export class AuthLayoutComponent {
  @Input("heading") heading;
  @Input("bg") bg;

}
