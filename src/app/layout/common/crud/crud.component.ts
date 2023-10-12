import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Location } from '@angular/common';
import sortArray from 'sort-array'
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  host:{class:'flex flex-col flex-auto overflow-y-auto h-0 bg-white'}
})
export class CrudComponent implements OnDestroy {
  @Input("breadcrumbs") breadcrumbs = [];
  @Input('isEmpty') isEmpty: boolean = false;
  @Input('isLoaded') isLoaded: boolean = false;
  @Input('rows') rows: any;
  @Input('columns') columns: any;
  @Input('actionsTemplate') actionsTemplate: any;
  @Input('formTemplate') formTemplate: any;
  @Input('whatsAppTemplate') whatsAppTemplate: any;
  @Input('filterTemplate') filterTemplate: any;
  @Input('gridTemplate') gridTemplate: any;
  @Input('pagination') pagination: any;
  @Output() onApply = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  searchControl: UntypedFormControl = new UntypedFormControl();
  searchToggle:boolean = false;
  drawer: boolean = false;
  filter: boolean = false;
  isEditable: boolean = false;
  constructor(private cd: ChangeDetectorRef, private location:Location) {


  }

  search(e:any){
      this.onSearch.emit(e);
  }

  toggle(e: any) {
    this.drawer = !this.drawer ? true : false;
    this.isEditable = (e !== null) ? true : false;
  }
  filterToggle(){
    this.filter = !this.filter ? true : false;
  }
  applyFilter(){
    this.onApply.emit();
  }
  submit(type:any) {
    if(type === 'add'){
      this.onSubmit.emit()
    }else{
      this.onUpdate.emit()
    }

  }
  sortData(e:any){

     sortArray(this.rows, {
      by: e.active,
      order: e.direction
    })

  }
  openedChanged(e:any){
    this.onChange.emit(e)
  }
  pageChange(e:any){
    this.onPageChange.emit(e)
  }
  back(){
    this.location.back()
  }

  ngOnDestroy(): void {

  }

  searchToggleFn(){
    if(!this.searchToggle ){
      this.searchToggle = true;

    }else{
      this.searchToggle = false;
      this.onSearch.emit('');
      this.searchControl.setValue("");
    }


  }
}


import { Directive } from '@angular/core';
@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private ele:ElementRef){  }
ngAfterViewInit(): void {
  this.ele.nativeElement.focus()
}
}
