import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class UsersComponent extends Unsubscribe implements OnInit {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("statusTemp", { static: false }) statusTemp: TemplateRef<any>;
  @ViewChild("orgsTemp", { static: false }) orgsTemp: TemplateRef<any>;
  @ViewChild("actionsTemp", { static: false }) actionsTemp: TemplateRef<any>;
  isEmpty:boolean = false;
  isLoaded:boolean = false;
  breadcrumbs: any = [
    {
      name: "Home",
      link: ''
    },
    {
      name: "Users",
      link: ''
    }
  ]
  users: any;
  orgs: any;
  columns: any;
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
  form: FormGroup = this.fb.group({
    // email: [""],
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    orgIds: [[], [Validators.required]],
    phoneNumber: ["", [Validators.required, Validators.pattern(this.api.patterns.mobile)]],
    roleId: 6,
    updateOrganization: true,
    updateRoles: true,
    userId: [null],
    userName: ["", [Validators.required, Validators.email]],
    status: [''],
    filterStatus: ['active']
  });



  userParams = {
    keyword: '',
    colName: 'user_name',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: '',
    pageCount: 0,
    pageSizes: [5, 10, 25]
  }

  data:any = [
    {
      id: 0,
      userName: 'naveen@gmail.com',
      firstName: 'Naveen',
      role: 'admin',
      status: 'active',
      organizationDtos: [
        {
          id:1,
          clientName: 'Akhil'
        },
        {
          id:2,
          clientName: 'Mohith'
        }
      ]
    },
    {
      id: 1,
      userName: 'akhil@gmail.com',
      firstName: 'Akhil',
      role: 'admin',
      status: 'active',
      organizationDtos: [
        {
          id:1,
          clientName: 'Naveen'
        },
      ]
    },
    {
      id: 2,
      userName: 'mohith@gmail.com',
      firstName: 'Mohith',
      role: 'admin',
      status: 'active',
      organizationDtos: [
        {
          id:1,
          clientName: 'Akhil'
        },
        {
          id:2,
          clientName: 'Naveen'
        },
        {
          id:3,
          clientName: 'kumar'
        }
      ]
    },

  ]

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder, private fcs: FuseConfirmationService, private snackbar: MatSnackBar) {
    super();
  }
  getList() {
    this.users = this.data;
    this.isLoaded = true,
    this.isEmpty = false;
      let { pageCount, pageSizes, ...userParams } = this.userParams;
    this.api.allUsers(userParams).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.statusCode === 200) {
          this.isEmpty = false;
          this.users = data.response;
          this.userParams.pageCount = data?.count;
          if(data.response.count == 0){
            this.isEmpty = true;
          }else{
            this.isEmpty = false;
          }
        }
      }
    });
  }
  getOrgList() {
    this.api.allOrgs({}).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        if (data.statusCode === 200) {
          this.orgs = data.response;
        }
      }
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.api.addUser(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('User Added', null, { duration: 1000 })
            this.getList();
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue(item)

   let orgs = item.organizationDtos.map(x=>x._id);
    this.form.get("orgIds").setValue(orgs)
    console.log(item,this.form.value)
    // this.form.get("userId").setValue(item.userId);
    this.form.get("userId").setValue(item._id);
  }
  onUpdate() {
    if (this.form.valid) {
      this.api.addUser(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('User Updated', null, { duration: 1000 })
            this.getList();
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  deleteFn(item: any) {
    let dialogRef = this.fcs.open();
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteUser(item._id).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('User Deleted', null, { duration: 1000 })
              this.getList();
            }
          }
        });
      }
    });
  }

  onApply(){
    this.userParams.status = this.form.value?.status;
    this.getList();
  }

  onSearch(e: any) {
    this.isLoaded = false;
    this.userParams.keyword = e.value ? e.value : '';
    this.getList();
  }

  onChange(e: any) {
    if (!e) {
      this.form.reset({status: this.form.get("status").value })
    }
  }

  onPageChange(e: any) {
    this.userParams.pageNumber = e.pageIndex;
    this.userParams.pageSize = e.pageSize;
    this.getList();
    this.getOrgList();
  }



  ngOnInit(): void {
    this.getList();
    this.getOrgList();
  }
  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'userName', name: 'Email', sort: true },
      { prop: 'firstName', name: 'Name', sort: true },
      { prop: 'organizationDtos', name: 'Organizations', cellTemplate:this.orgsTemp },
      { prop: 'role', name: 'Role', sort: true },
      { prop: 'status', name: 'Status', cellTemplate: this.statusTemp, sort: true },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: ' md:block !flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges()
  }
}
