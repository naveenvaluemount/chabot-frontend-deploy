import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class ThemesComponent extends Unsubscribe implements OnInit, OnDestroy {
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
      name: "Themes",
      link: ''
    }
  ]
  themes: any;
  columns: any;
  oid: any;
  form: FormGroup = this.fb.group({
    buttonBackgroundColor: ['', [Validators.required]],
    buttonHoverBackgroundColor: ['', [Validators.required]],
    buttonHoverTextColor: ['', [Validators.required]],
    buttonTextColor: ['', [Validators.required]],
    chatbotBackgroundColor: ['', [Validators.required]],
    chatbotTextColor: ['', [Validators.required]],
    imageName: [''],
    imageType: [''],
    messageBackgroundColor: ['', [Validators.required]],
    organizationId: 0,
    status: ['inActive', [Validators.required]],
    themeId: [null],
    themeName: ['', [Validators.required]],
    userMessageTextColor: ['', [Validators.required]],
    // windowBorderColor: ['', [Validators.required]],
    windowTitleBackgroundColor: ['', [Validators.required]],
    windowTitleTextColor: ['', [Validators.required]],
  });

  params = {
    client: '',
    keyword: '',
    colName: 'theme_name',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: '',
    pageCount: 0,
    pageSizes: [5, 10, 25]
  };

  data: any = [
    {
      id: 1,
      theme: "Blue"
    }
  ];

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder, private fcs: FuseConfirmationService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    super();


  }
  onSubmit() {
    if (this.form.valid) {
      this.api.addTheme(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('theme Added', null, { duration: 1000 })
            this.getList(this.oid);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  onUpdate() {
    if (this.form.valid) {
      this.api.addTheme(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('theme Updated', null, { duration: 1000 });
            this.form.get('status').setValue('')
            this.getList(this.oid);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  getList(id: any) {
    this.themes = this.data;
    this.isLoaded = true;
    this.isEmpty = false;
      this.params.client = id
      let { pageCount, pageSizes, ...params } = this.params;
    this.api.allThemes(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.response.statusCode === 200) {
          this.isEmpty = false;
          this.themes = data.response.response;
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

  onApply(){
    this.params.status = this.form.value.status;
    this.getList(this.oid);
}

onSearch(e: any) {
    this.params.keyword = e.value ? e.value : '';
    this.isLoaded = false;
    this.getList(this.oid);
}

  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue(item)
    this.form.get("themeId").setValue(item.themeId);
    console.log(this.oid)
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteTheme(item.themeId, this.oid).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.response.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('User Deleted', null, { duration: 1000 })
              this.getList(this.oid);
            }
          }
        });
      }
    });
  }

  onPageChange(e: any) {
    this.params.pageNumber = e.pageIndex;
    this.params.pageSize = e.pageSize;
    this.getList(this.oid);
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
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'name', name: 'Name' },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: '!flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges()
  }
  onChange(e: any) {
    if (!this.crud?.isEditable) {
      this.form.get("windowTitleBackgroundColor").setValue('#a855f7');
      this.form.get("windowTitleTextColor").setValue('#ffffff');
      this.form.get("chatbotBackgroundColor").setValue('#a855f7');
      this.form.get("chatbotTextColor").setValue('#ffffff');
      this.form.get("messageBackgroundColor").setValue('#ffffff');
      this.form.get("userMessageTextColor").setValue('#e5e7eb');
      this.form.get("buttonBackgroundColor").setValue('#a855f7');
      this.form.get("buttonTextColor").setValue('#ffffff');
      this.form.get("buttonHoverBackgroundColor").setValue('#591a93');
      this.form.get("buttonHoverTextColor").setValue('#ffffff');
    }
    if (!e) {
      this.form.reset({ organizationId: this.form.get("organizationId").value,status: this.form.get("status").value });
    }
  }
  ngOnDestroy(): void {
  }
}
