import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { valid } from 'chroma-js';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class WhitelistComponent extends Unsubscribe implements OnInit {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("ipTemp", { static: false }) ipTemp: TemplateRef<any>;
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
      name: "Whitelist",
      link: ''
    }
  ]
  categories: any;
  columns: any;
  oid: any;
  form: FormGroup = this.fb.group({
    id: [0],
    addressType: ['', [Validators.required]],
    domain: [""],
    ipAddressName: [""],
    status: [''],
    organizationId: [null],
  });

  params = {
    client: '',
    keyword: '',
    colName: 'ip_address',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: '',
    pageCount: 0,
    pageSizes: [5, 10, 25]
  }

  data: any = [
    {
      ipAddressName: '192.168.92.167',
      status: 'active'
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
    this.api.allWhitelist(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.statusCode === 200) {
          this.isEmpty = false;
          this.categories = data.response;
          this.params.pageCount = data.response.count;
          if(data.response.count == 0){
            this.isEmpty = true;
          }else{
            this.isEmpty = false;
          }
        }
        if (data.response.statusCode === 404) {
          this.isEmpty = true;
        }
      }
    });
  }

  checkValidation(data: any){
    if (data == 'domain') {
        this.form.clearValidators();
        this.form.get('ipAddressName').setErrors(null);
        this.form.get('domain').setValidators([Validators.required,Validators.pattern(this.api.patterns.domain)])
    }
    if (data == 'ip') {
        this.form.clearValidators();
        this.form.get('domain').setErrors(null);
        this.form.get('ipAddressName').setValidators([Validators.required,Validators.pattern(this.api.patterns.ip)])
    }
    this.form.updateValueAndValidity();
  }

  onApply(){
    this.params.status = this.form.value?.status;
    this.getList(this.oid);
  }

  onSearch(e: any) {
    this.isLoaded = false;
    this.params.keyword = e.value ? e.value : '';
    this.getList(this.oid);
  }

  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue(item)
    this.form.get("id").setValue(item._id);
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteWhitelist(item._id, this.oid).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('IP Deleted', null, { duration: 1000 })
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
      { prop: 'ipAddressName', name: 'IP/Domain Address',cellTemplate: this.ipTemp, sort: true },
      { prop: 'status', name: 'Status', cellTemplate: this.statusTemp, sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: '!flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges()
  }
  onSubmit() {
    if (this.form.valid) {
      this.api.createWhitelist(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('IP Added', null, { duration: 1000 })
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
      this.api.createWhitelist(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('IP Updated', null, { duration: 1000 })
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
      this.form.reset({ organizationId: this.form.get("organizationId").value })
    }
  }
}
