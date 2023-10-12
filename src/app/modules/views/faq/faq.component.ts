import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/core/api.service';
import { Unsubscribe } from 'app/core/unsubscribe';
import { CrudComponent } from 'app/layout/common/crud/crud.component';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  host:{class:'flex flex-col flex-auto'}
})
export class FaqComponent extends Unsubscribe implements AfterViewInit, OnInit {
  @ViewChild(CrudComponent, { static: false }) crud: CrudComponent;
  @ViewChild("qnaTemp", { static: false }) qnaTemp: TemplateRef<any>;
  @ViewChild("createdOnTemp", { static: false }) createdOnTemp: TemplateRef<any>;
  @ViewChild("updatedOnTemp", { static: false }) updatedOnTemp: TemplateRef<any>;
  @ViewChild("actionsTemp", { static: false }) actionsTemp: TemplateRef<any>;
  oid:any;
  isEmpty:boolean = false;
  isLoaded:boolean = false;
  breadcrumbs:any = [
    {
      name:"Home",
      link:''
    },
    {
      name:"Organizations",
      link:''
    },
    {
      name:"FAQ",
      link:''
    }
  ]

  faqs: any;
  columns: any;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    loginTypesId: ['', [Validators.required]],
    questions: this.fb.array([]),
    answer: ['', [Validators.required]],
    organizationId: 0,
    faqId: [],
    status: [true],
    qnaPrompts: this.fb.array([]),
  });

  params = {
    client: '',
    keyword: '',
    colName: 'title',
    pageSize: 25,
    pageNumber: 0,
    orderby: false,
    status: false,
    pageCount: 0,
    pageSizes: [5, 10, 25]
  }

  faqTypeList: any = [
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

  staticFaqsList: any = [
    {
      id: 1,
      title: 'hlo',
      faqType: 'prelogin',
      answer: 'Hlo',
      createdTime: '15863584',
      updatedTime: '755455'
    }
  ]

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder, private route: ActivatedRoute, private fcs: FuseConfirmationService, private snackbar: MatSnackBar) {
      super();
  }

ngOnInit(): void {
  this.route?.parent?.parent?.params.subscribe(data => {
    if (data.id) {
      this.oid = data.id;
      this.getAllFaqs(this.oid);
      this.form.get("organizationId").setValue(this.oid)
    }
  })
}

ngAfterViewInit(): void {
    this.columns = [
      { prop: 'title', name: 'Title', sort: true},
      { prop: 'faqType', name: 'FAQ Type',sort: true },
      { prop: 'answer', name: 'QnA', cellTemplate: this.qnaTemp },
      { prop: 'createdTime', name: 'Created On', cellTemplate: this.createdOnTemp },
      { prop: 'updatedTime', name: 'Updated On', cellTemplate: this.updatedOnTemp },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemp, class: '!flex-0 basis-[100px]' },
    ]
    this.cd.detectChanges()
  }


 questions() : FormArray {
  return this.form.get("questions") as FormArray
 }

 premices(): FormArray {
     return this.form.get('qnaPrompts') as FormArray
 }

 newQuestion(data?: any): FormGroup {
     if (data) {
         return this.fb.group({
             id: data.id ? data.id : '',
             name: data.name ? data.name : '',
             rowStatus: JSON.stringify(data.rowStatus) ? JSON.stringify(data.rowStatus)  : ''
         }, [Validators.required]);
     } else {
        return this.fb.group({
            name: ['', [Validators.required]]
        });
     }
  }

 newPremices(data?: any): FormGroup {
    if (data) {
        return this.fb.group({
            id: data.id ? data.id : '',
            faqId: data.faqId ? data.faqId : '',
            displayText: data.displayText ? data.displayText : '',
            displayOrder: data.displayOrder ? data.displayOrder  : ''
        });
    } else {
        return this.fb.group({
            faqId: [''],
            displayText: [''],
            displayOrder: ['']
        });
    }
  }


  addQuestions(data: any) {
      if (data) {
          this.questions().push(this.newQuestion(data));
      } else {
        this.questions().push(this.newQuestion());
      }
  }

  addPremices(data: any) {
    if (data) {
        this.premices().push(this.newPremices(data));
    } else {
        this.premices().push(this.newPremices());
    }

  }

  removeQuestions(i:number) {
    this.questions().removeAt(i);
  }

  removePremices(i:number) {
    this.premices().removeAt(i);
  }

  getAllFaqs(id: any){
    this.faqs = this.staticFaqsList;
    this.isLoaded = true;
    this.isEmpty= false;
    this.params.status = this.form.value?.status;
    this.params.client = id;
    let { pageCount, pageSizes, ...params } = this.params;
    this.api.allFaqs(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.isLoaded = true;
        if (data.response.statusCode === 200) {
          this.isEmpty = false;
          this.faqs = data.response.response;
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

  onSubmit() {
    if (this.form.valid) {
      this.api.addFaq(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('FAQ Added', null, { duration: 1000 });
            this.getAllFaqs(this.oid);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onUpdate() {
    if (this.form.valid) {
      this.api.addFaq(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        if (data.statusCode === 200) {
          if (data.response.statusCode === 200) {
            this.crud.toggle(null);
            this.isLoaded = false;
            this.snackbar.open('FAQ Updated', null, { duration: 1000 })
            this.getAllFaqs(this.oid);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  updateFn(item: any) {
    this.crud.toggle("edit");
    this.form.patchValue({
    title: item.title,
    loginTypesId: item.loginTypesId,
    answer: item.answer,
    questions: this.fb.array[(item.questions?.map((data: any)=>{
        this.addQuestions(data);
    }))],
    qnaPrompts: this.fb.array[(item.qnaPrompts?.map((data: any)=>{
        this.addPremices(data);
    }))],
    // organizationId: 0,
    // status: true,
    })
    this.form.get("faqId").setValue(item.faqId);
  }

  deleteFn(item: any) {
    let dialogRef = this.fcs.open();

    let params = {
        faqId:item.faqId,
        client: this.oid

    }

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result === 'confirmed') {
        this.api.deleteFaq(params).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
          if (data.statusCode === 200) {
            if (data.response.statusCode === 200) {
              this.isLoaded = false;
              this.snackbar.open('FAQ Deleted', null, { duration: 1000 });
              this.getAllFaqs(this.oid);
            }
          }
        });
      }
    });
  }

  onChange(e: any) {
    if (!e) {
        this.form.reset({ organizationId: this.form.get("organizationId").value,status: this.form.get("status").value })
    }

    if (!this.form.get('faqId')?.value) {
       this.questions().clear();
        this.questions().push(this.newQuestion());
       this.premices().clear();
        this.premices().push(this.newPremices());
    }else{
        this.questions().removeAt(0);
        this.premices().removeAt(0);
    }

  }


  onPageChange(e: any) {
    this.params.pageNumber = e.pageIndex;
    this.params.pageSize = e.pageSize;
    this.getAllFaqs(this.oid);
  }

  onApply() {
    this.getAllFaqs(this.oid);
  }

  onSearch(e: any) {
    this.isLoaded = false;
        this.params.keyword = e.value ? e.value : '';
        this.getAllFaqs(this.oid);
  }

}
