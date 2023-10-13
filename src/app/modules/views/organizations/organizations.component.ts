import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class OrganizationsComponent extends Unsubscribe implements AfterViewInit, OnInit {
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
      name: "Organizations",
      link: ''
    }
  ]
  orgs: any;
  columns: any;
  form: FormGroup = this.fb.group({
    clientName: ["", [Validators.required]],
    // name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: ["", [Validators.required, Validators.pattern(this.api.patterns.mobile)]],
    domain: ["", [Validators.required, Validators.pattern(this.api.patterns.domain)]],
    address: ["", [Validators.required]],
    status: [""],
    publishedStatus: [true],
    published: [''],
    validate: [true],
    defaultAnswer: [""],
    id: [null],
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

  data: any =[
    {
      id:0,
      clientName: 'Naveen',
      createdTime: '001245583',
      publishedStatus: 'active',
      status: 'active',
      updatedTime: '4862268356'

    }
  ]
  constructor(private api: ApiService, private fb: FormBuilder, private cd: ChangeDetectorRef, private fcs: FuseConfirmationService, private snackbar: MatSnackBar, private router: Router) {
    super();
  }
  getList() {
    this.orgs = this.data;
    this.isLoaded = true;
    this.isEmpty = false;
    let { pageCount, pageSizes, ...params } = this.params;
    this.api.allOrgs(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.statusCode === 200) {
          this.isEmpty = false;
          this.orgs = data.response;
          // this.params.pageCount = data.response.count;
          // if(data.response.count == 0){
          //   this.isEmpty = true;
          // }else{
          //   this.isEmpty = false;
          // }
        }
      }
    });
  }
  ngOnInit(): void {
    this.getList();
  }
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'clientName', name: 'Organization Name', cellTemplate:this.orgTemp, sort: true },
      // { prop: 'domain', name: 'Domain', sort: true },
      // { prop: 'publishedOn', name: 'Published On', cellTemplate: this.publishonTemp, sort: true },
      { prop: 'createdTime', name: 'Created On', cellTemplate: this.createdTemp, sort: true },
      { prop: 'updatedTime', name: 'Updated On', cellTemplate: this.updatedTemp, sort: true },
      { prop: 'publishedStatus', name: 'Published', cellTemplate: this.publishTemp, sort: true },
      { prop: 'status', name: 'Status', cellTemplate: this.statusTemp, sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp},
    ]
    this.cd.detectChanges()
  }
  onSubmit() {
    if (this.form.valid) {
      this.api.createOrg(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Org Added', null, { duration: 1000 })
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
      this.api.createOrg(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('Org Updated', null, { duration: 1000 })
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
      this.form.reset({status: this.form.get('status').value, published: this.form.get('published').value})
    }

  }
  updateFn(item: any) {
      console.log(item)
    this.crud.toggle("edit");
    this.form.patchValue(item)
    this.form.get("id").setValue(item._id);
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteOrg(item._id).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('Org Deleted', null, { duration: 1000 })
              this.getList();
            }
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
