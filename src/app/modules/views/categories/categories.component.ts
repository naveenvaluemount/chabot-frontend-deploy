import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class CategoriesComponent extends Unsubscribe implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("actionsTemp", { static: false }) actionsTemp: TemplateRef<any>;
  isEmpty:boolean = false;
  isLoaded:boolean = false;
  breadcrumbs: any = [
    {
      name: "Home",
      link: ''
    },
    {
      name: "Organizations",
      link: ''
    },
    {
      name: "Categories",
      link: ''
    }
  ]
  categories: any;
  columns: any;
  oid: any;
  form: FormGroup = this.fb.group({
    categoryName: ["", Validators.required],
    description: [""],
    parentCategoryId: [""],
    categoryId: [null],
    organizationId: [null],
    status: ['']
  });

  statusList: any = [
    {
        id: 0,
        name: 'Active',
        value: 'active'
    },
    {
        id: 1,
        name: 'In Active',
        value: 'inActive'
    }
];

  params = {
    client: '',
    keyword: '',
    colName: 'category_name',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: '',
    pageCount: 0,
    pageSizes: [5, 10, 25]
  }


  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder, private route: ActivatedRoute, private fcs: FuseConfirmationService, private snackbar: MatSnackBar) {
    super();
  }
  getList(id: any) {

      this.params.status = JSON.stringify(this.form.value?.status) ? JSON.stringify(this.form.value?.status) : 'all';
      this.params.client = id
      let { pageCount, pageSizes, ...params } = this.params;
    this.api.allCategories(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.response.statusCode === 200) {

        
          this.categories = data.response.response;
          this.params.pageCount = data.response.count;
          if(data.response.count == 0){
            this.isEmpty = true;
          }else{
            this.isEmpty = false;
          }
        }
       
      }
    });
  }
  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue(item)
    this.form.get("categoryId").setValue(item.categoryId);
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteCategory(item.categoryId, this.oid).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.response.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('Category Deleted', null, { duration: 1000 });
              this.getList(this.oid);
            }
          }
        });
      }
    });
  }
  ngOnInit(): void {
    if(this.api.organization.id){
          this.oid = this.api.organization.id;
          this.getList(this.oid);
          this.form.get("organizationId").setValue(this.oid)
        }
  }
  ngOnChanges() {
  }
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'categoryName', name: 'Category',sort: true },
      { prop: 'parentCategoryName', name: 'Parent',sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: '!flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges()
  }
  onSubmit() {
    if (this.form.valid) {
      this.api.createCategory(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Category Added', null, { duration: 1000 })
            this.getList(this.oid);
          }
        }
      });
    }
    else {
      this.form.markAllAsTouched();
    }
  }
  onUpdate() {
    if (this.form.valid) {
      this.api.createCategory(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Category Updated', null, { duration: 1000 })
            this.getList(this.oid);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  onChange(e: any) {
    if (!e) {
      this.form.reset({ organizationId: this.form.get("organizationId").value, status: this.form.get('status').value })
    }
  }

  onPageChange(e: any) {
    this.params.pageNumber = e.pageIndex;
    this.params.pageSize = e.pageSize;
    this.getList(this.oid);
  }

  onApply(){
    this.getList(this.oid)
  }
}
