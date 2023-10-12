import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class ServicesComponent extends Unsubscribe implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("statusTemp", { static: false }) statusTemp: TemplateRef<any>;
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
      name: "Services",
      link: ''
    }
  ]
  categories: any = [];
  columns: any;
  oid: any;
  form: FormGroup = this.fb.group({
    categoryName: ["", Validators.required],
    answer: [""],
    // parentCategoryId: [""],
    categoryId: [null],
    organizationId: [null],
    status: [''],
    loginTypesId: ['', [Validators.required]],
    qnaPrompts: this.fb.array([]),
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

serviceTypeList: any = [
    {
        id: '1',
        name: 'Both',
        value: 3
    },
    {
        id: '2',
        name: 'Pre Login',
        value: 1
    },
    {
        id: '3',
        name: 'Post Login',
        value: 2
    },

]

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

  data: any = [
    {
      id: 1,
      categoryName: 'test',
      parentCategoryName: 'test',
      status: 'active'
    },
    {
      id: 2,
      categoryName: 'hlo',
      parentCategoryName: 'hlo',
      status: 'inActive'
    }
  ]

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder, private route: ActivatedRoute, private fcs: FuseConfirmationService, private snackbar: MatSnackBar) {
    super();
  }
  getList(id: any) {
    this.categories = this.data;
    this.isLoaded = true;
    this.isEmpty = false;
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

  premices(): FormArray {
    return this.form.get('qnaPrompts') as FormArray;
  }

  newPremices(data?: any): FormGroup {
    if (data) {
        return this.fb.group({
            id: data.id ? data.id : '',
            categoryId: data.categoryId ? data.categoryId : '',
            displayText: data.displayText ? data.displayText : '',
            displayOrder: data.displayOrder ? data.displayOrder  : ''
        });
    } else {
        return this.fb.group({
            categoryId: [''],
            displayText: [''],
            displayOrder: ['']
        });
    }
  }

  addPremices(data: any) {
    if (data) {
        this.premices().push(this.newPremices(data));
    } else {
        this.premices().push(this.newPremices());
    }

  }

  removePremices(i:number) {
    this.premices().removeAt(i);
  }

  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue({
        categoryName: item.categoryName,
        loginTypesId: item.loginTypesId,
        answer: item.answer,
        status: item.status,
        qnaPrompts: this.fb.array[(item.qnaPrompts?.map((data: any)=>{
            this.addPremices(data);
        }))],
    })
    this.form.get("categoryId").setValue(item.categoryId);
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    let params = {
        client: this.oid
    }
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteCategory(item.categoryId,params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
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
    this.route?.parent?.parent?.params.subscribe(data => {
      if (data.id) {
        this.oid = data.id;
        this.getList(this.oid);
        this.form.get("organizationId").setValue(this.oid)
      }
    })


  }
  ngOnChanges() {
  }
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'categoryName', name: 'Service',sort: true },
      { prop: 'answer', name: 'Display Text',sort: true },
      { prop: 'status', name: 'Status', cellTemplate: this.statusTemp, sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: '!flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges();
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
    if (!this.form.get('categoryId')?.value) {
        this.premices().clear();
         this.premices().push(this.newPremices());
     }else{
         this.premices().removeAt(0);
     }
  }

  onPageChange(e: any) {
    this.params.pageNumber = e.pageIndex;
    this.params.pageSize = e.pageSize;
    this.getList(this.oid);
  }

  onApply(){
    this.params.status = this.form.value?.status;
    this.getList(this.oid)
  }
  onSearch(e: any){
    this.isLoaded = false;
      this.params.keyword = e.value ? e.value : '';
      this.getList(this.oid);
  }
}
