import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template:`
  <ng-content select="app-dialog-header"></ng-content>
  <ng-content select="app-dialog-body"></ng-content>
  <ng-content select="app-dialog-footer"></ng-content>
  `,
  host:{class:'flex flex-col flex-auto'}
})
export class DialogComponent {
}

@Component({
  selector: 'app-dialog-header',
  template:`
   <h5 class="text-lg text-secondary font-medium flex-1">{{title}}</h5>
    <ng-content></ng-content>`,
  host:{class:'flex-0 flex gap-3 items-center px-8 py-2 border-b h-[64px]'}
})
export class DialogHeaderComponent {
  @Input("title") title = "Title";
}

@Component({
  selector: 'app-dialog-body',
  template:`
  <div class="p-8">
  <ng-content></ng-content>
</div>`,
  host:{class:'flex-1 bg-gray-50 overflow-y-auto'}
})
export class DialogBodyComponent {}

@Component({
  selector: 'app-dialog-footer',
  template:`<ng-content></ng-content>`,
  host:{class:'flex-0 px-8 py-3 border-t flex justify-end gap-2'}
})
export class DialogFooterComponent {}

