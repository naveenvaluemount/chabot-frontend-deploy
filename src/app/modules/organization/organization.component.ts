import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/api.service';
import { CodeSnippetComponent } from '../views/code-snippet/code-snippet.component';
import { PublishComponent } from '../views/publish/publish.component';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  host: { class: 'flex flex-auto w-full max-w-full min-w-0' }
})
export class OrganizationComponent {
  @ViewChild("code") code: any;
  organization: any;
  organizations: any = [];
  user: any;
  constructor(public api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.user = this.api.userData;
    this.route.params.subscribe(data => {
      if (data.id) { this.getOrganization(data.id) }
    })
    if (this.api.isAdmin()) {
      this.getOrganizations();
    }
  }
  getCode(e: any) {
    this.dialog.open(CodeSnippetComponent, { width: '1350px', data: this.organization?.secret })
  }
  
  getPublish(e: any) {
    this.dialog.open(PublishComponent, { width: '300px', data: {id: this.organization?.id, content: 'Do you Want To Publish This Organization?'} })
  }
  getOrganizations() {
    this.api.allOrgs({}).subscribe((data: any) => {
      let { response: { response: results, statusCode: s2 }, statusCode: s1 } = data;
      if (s1 === 200 && s2 === 200) { this.organizations = results; }
    })
  }
  getOrganization(id: any) {
    this.organization = {
      _id: 41,
      secret: '22854636952'
    }
    this.api.singleOrg(id).subscribe((data: any) => {
      // let { response: { response: results, statusCode: s2 }, statusCode: s1 } = data;
      // if (s1 === 200 && s2 === 200) { this.organization = results; }
      this.organization.id = data.response._id;
      this.organization.secret = data.response.secret;
    })
  }
}
