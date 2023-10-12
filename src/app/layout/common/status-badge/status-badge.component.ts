import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
  host:{class:'flex items-center gap-2'}
})
export class StatusBadgeComponent {
  @Input("className") className = 'bg-red-500';
  @Input("label") label = 'Status';

}
