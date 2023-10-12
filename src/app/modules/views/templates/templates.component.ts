import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { debounceTime, takeUntil, pairwise } from 'rxjs';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class TemplatesComponent extends Unsubscribe implements AfterViewInit, OnInit {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("orgTemp", { static: false }) orgTemp: TemplateRef<any>;
  @ViewChild("createdTemp", { static: false }) createdTemp: TemplateRef<any>;
  @ViewChild("updatedTemp", { static: false }) updatedTemp: TemplateRef<any>;
  @ViewChild("actionsTemp", { static: false }) actionsTemp: TemplateRef<any>;
  @ViewChild("publishTemp", { static: false }) publishTemp: TemplateRef<any>;
  @ViewChild("publishonTemp", { static: false }) publishonTemp: TemplateRef<any>;
  @ViewChild("statusTemp", { static: false }) statusTemp: TemplateRef<any>;
  isEmpty: boolean = false;
  isLoaded: boolean = false;
  breadcrumbs: any = [
    {
      name: "Home",
      link: ''
    },
    {
      name: "Templates",
      link: ''
    }
  ]
  templates: any;
  columns: any;
  form: FormGroup = this.fb.group({
    category: ["", [Validators.required]],
    templateName: ["", [Validators.required]],
    language: ["", [Validators.required]],
    content: this.fb.array([]),
    templateId: [null],
  });
  filter: FormGroup = this.fb.group({
    status: ["all"],
    published_status: ['all'],
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
  sectionList: any = [
    {
      id: 0,
      name: 'Header',
      value: 'HEADER'
    },
    {
      id: 1,
      name: 'Body',
      value: 'BODY'
    },
    {
      id: 1,
      name: 'Footer',
      value: 'FOOTER'
    }
  ];
  languageList: any = [
    {
      id: 0,
      name: 'en',
      value: 'en'
    }
  ];
  categoryList: any = [
    {
      id: 0,
      name: 'MARKETING',
      value: 'MARKETING'
    },
    {
      id: 1,
      name: 'UTILITY',
      value: 'UTILITY'
    },
    {
      id: 1,
      name: 'AUTHENTICATION',
      value: 'AUTHENTICATION'
    }
  ];
  publishedList: any = [
    {
      id: 0,
      name: 'Published',
      value: 'published'
    },
    {
      id: 1,
      name: 'Un Published',
      value: 'unPublished'
    }
  ]
  params = {
    keyword: '',
    colName: 'organization_name',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: '',
    published_status: '',
    pageCount: 0,
    pageSizes: [5, 10, 25]
  }
  exp: string[] = [];
  showExample: boolean = false;

  data: any = [
    {
      id: 0,
      templateName:'Ecommerce',
      category: 'static',
      language: 'EN',
      status: 'active',
      modifiedOn: '5862486355'
    },
    {
      id: 1,
      templateName:'Food',
      category: 'static',
      language: 'EN',
      status: 'inActive',
      modifiedOn: '545212545'
    },
    {
      id: 2,
      templateName:'Silver',
      category: 'static',
      language: 'EN',
      status: 'active',
      modifiedOn: '75122563'
    }
  ]
  constructor(private api: ApiService, private fb: FormBuilder, private cd: ChangeDetectorRef, private fcs: FuseConfirmationService, private snackbar: MatSnackBar, private router: Router) {
    super();
  }
  getList() {
    this.templates = this.data;
    this.isLoaded = true;
    this.isEmpty = false;
    // let { pageCount, pageSizes, ...params } = this.params;
    this.api.allTemplates().pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.response.length !== 0) {
          this.isEmpty = false;
          this.templates = data.response;
          console.log("template List",this.templates)
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
  ngOnInit(): void {
    this.getList();
  }
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'templateName', name: 'Template Name', sort: true },
      // { prop: 'domain', name: 'Domain', sort: true },
      // { prop: 'publishedOn', name: 'Published On', cellTemplate: this.publishonTemp, sort: true },
      { prop: 'category', name: 'Category', sort: true },
      { prop: 'status', name: 'Status', sort: true },
      { prop: 'language', name: 'Language',  sort: true },
      { prop: 'modifiedOn', name: 'Modified On', sort: true },
    //   { prop: 'status', name: 'Status', cellTemplate: this.statusTemp, sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp},
    ]
    this.cd.detectChanges();
  }

// content
// :
// [{id: 7, section: "HEADER", value: "Dear {{1}}", example: ["Naveen"]},…]


content(): FormArray {
    return this.form.get('content') as FormArray;
}

  newContent(data?: any): FormGroup {
    if (data) {
        return this.fb.group({
            templateId: data.id ? data.id : '',
            section: data.section ? data.section : '',
            value: data.value ? data.value : '',
            example: [data.example] ? [data.example]  : []
        });
    } else {
        return this.fb.group({
            templateId: [null],
            section: [''],
            value: [''],
            example: [[]]
        });
    }
  }

//   getExample(form) {
//     return form.controls.example.controls;
//   }

// example(): FormArray {
//     return this.content()
//       .get('example') as FormArray;
//   }


  addContent(data: any) {
    if (data) {
        console.log(this.form.get('content').value.length)
        this.content().push(this.newContent(data));
    } else {
        this.content().push(this.newContent());
    }

    const contentArray = this.form.get("content") as FormArray;
    contentArray.controls.forEach((contentControl, contextIndex) => {
        console.log("contextIndex",contextIndex)
        const valueControl = contentControl.get('value');
        const exampleControl = contentControl.get('example');

        // value Control value changes handler
        valueControl.valueChanges
            .pipe(pairwise())
            .subscribe(([oldValue, newValue]: [any, any]) => {
                const values = contentControl.get('value') as FormArray;
                if(oldValue !== newValue) {
                    values.patchValue(newValue);
                    const oldDynamicParamsCount = oldValue.match(/{{\d+}}/g)?.length || 0;
                    const dynamicParamsCount = newValue.match(/{{\d+}}/g)?.length || 0;
                    console.log(dynamicParamsCount)
                    if (dynamicParamsCount > 0) {
                        this.showExample = true;

                    }else{
                        this.showExample = false;
                    }
                    if(oldDynamicParamsCount != dynamicParamsCount) {
                        const examples = contentControl.get('example') as FormArray;
                        if(examples.value?.length > dynamicParamsCount) {
                            examples.patchValue(examples.value.splice(0, dynamicParamsCount));
                        }
                    }
                }
            });

        // Example Control value changes handler
        exampleControl.valueChanges
            .pipe(pairwise())
            .subscribe(([oldValue, newValue]: [any, any]) => {
                const examples = contentControl.get('example') as FormArray;
                console.log(typeof(newValue))
                if(oldValue !== newValue) {

                    newValue = typeof(newValue) == 'string' ? newValue.split(',').map(value => value.trim()) : newValue;
                    examples.patchValue(newValue);
                }
            });
    })

  }


  onSubmit() {
      console.log(this.form.value)
    if (this.form.valid) {
      this.api.addTemplate(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        console.log(data)
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Template Added', null, { duration: 1000 })
            this.getList();
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  onUpdate() {
    if (this.form.valid) {
      this.api.addTemplate(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Template Updated', null, { duration: 1000 })
            this.getList();
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  onChange(e: any) {
    if (!e) {
    //   this.form.reset({status: this.form.get('status').value, published: this.form.get('published').value})
    }
    if (!this.form.get('templateId')?.value) {
        this.form.reset()
        this.content().clear();
        //  this.content().push(this.newContent());
     }else{
         this.content().removeAt(0);
     }

  }
  updateFn(item: any) {
      console.log(item)
    this.crud.toggle("edit");
    this.form.patchValue({
        category: item.category,
        templateName: item.templateName,
        language: item.language,
        content: this.fb.array[(item.content?.map((data: any)=>{
            this.addContent(data);
        }))],
    })
    this.form.get("templateId").setValue(item.id);
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteTemplate(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('Template Deleted', null, { duration: 1000 })
              this.getList();
          }
        });
      }
    });
  }
  onPageChange(e: any) {
    this.params.pageNumber = e.pageIndex;
    this.params.pageSize = e.pageSize;
    this.getList();
  }
  getSecret(row) {
    this.router.navigate(['manageOrganizations/code', row.id]);
    this.api.secret = row.secret;
  }
  onApply() {
    this.params.published_status = this.filter.value.published_status;
    this.params.status = this.filter.value.status;
    this.getList();
    this.crud.filterToggle();
  }

  onSearch(e: any){
    this.isLoaded = false;
    this.params.keyword = e.value ? e.value : '';
    this.getList();
}

}
