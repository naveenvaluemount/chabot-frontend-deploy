
import {Injectable, OnDestroy } from '@angular/core';
import {Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Unsubscribe implements OnDestroy{
  unsubscribe: Subject<boolean> = new Subject<boolean>();
  constructor(){}
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.unsubscribe();
  }
}
