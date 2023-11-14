import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { Observable, of, Subject, switchMap } from 'rxjs';
export const ADMIN = 6;
export const SUPERADMIN = 5;
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  get accessToken(): any {
    return localStorage.getItem('accessToken') ?? '';
  }
  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }
  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }
  set userData(value: string) {
    localStorage.setItem('userData', JSON.stringify(value));
  }
  get userData(): any {
    return JSON.parse(localStorage.getItem('userData')) ?? '';
  }
  set secret(value: string) {
    localStorage.setItem('secret', value);
  }
  get secret(): any {
    return localStorage.getItem('secret') ?? '';
  }
  set organization(value: string) {
    localStorage.setItem('organization', JSON.stringify(value));
  }
  get organization(): any {
    return JSON.parse(localStorage.getItem('organization')) ?? '';
  }
  patterns = {
    mobile: '\^\(\(\[\+\]\\91\[\\s\]\?\)\?\)\\d\{10\}\$',
    domain: '\^\(\(\?:\(https\?\):\\/\\/\)\?\(\(\?:25\[0-5\]\|2\[0-4\]\[0-9\]\|1\[0-9\]\[0-9\]\|\[0-9\]\[0-9\]\|\[0-9\]\)\\\.\(\?:\(\?:25\[0-5\]\|2\[0-4\]\[0-9\]\|1\[0-9\]\[0-9\]\|\[0-9\]\[0-9\]\|\[0-9\]\)\\\.\)\(\?:\(\?:25\[0-5\]\|2\[0-4\]\[0-9\]\|1\[0-9\]\[0-9\]\|\[0-9\]\[0-9\]\|\[0-9\]\)\\\.\)\(\?:\(\?:25\[0-5\]\|2\[0-4\]\[0-9\]\|1\[0-9\]\[0-9\]\|\[0-9\]\[0-9\]\|\[0-9\]\)\)\|\(\?:\(\?:\(\?:\\w\+\\\.\)\{1,2\}\[\\w\]\{2,3\}\)\)\)\(\?::\(\\d\+\)\)\?\(\(\?:\\/\[\\w\]\+\)\*\)\(\?:\\/\|\(\\/\[\\w\]\+\\\.\[\\w\]\{3,4\}\)\|\(\\\?\(\?:\(\[\\w\]\+=\[\\w\]\+\)&\)\*\(\[\\w\]\+=\[\\w\]\+\)\)\?\|\\\?\(\?:\(wsdl\|wadl\)\)\)\)\$',
    ip: '\^\(\(25\[0-5\]\|2\[0-4\]\[0-9\]\|\[01\]\?\[0-9\]\[0-9\]\?\)\\\.\)\{3\}\(25\[0-5\]\|2\[0-4\]\[0-9\]\|\[01\]\?\[0-9\]\[0-9\]\?\)\$'
  }
  constructor(private http: HttpClient, private router: Router) { }
  // Users
  login(fb: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.users.login}`, fb).pipe(
      switchMap((response: any) => {
        // this.addSession(response.response.accessToken.Authorization, response.response.accessToken.REFRESH_TOKEN);
        this.addSession(response.accessToken, response?.REFRESH_TOKEN);
        this.userData = response.response;
        return of(response)
      })
    );
  }
  register(fb: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.users.register}`, fb).pipe(
      switchMap((response: any) => {
        // this.addSession(response.response.accessToken.Authorization, response.response.accessToken.REFRESH_TOKEN);
        this.userData = response.response;
        return of(response)
      })
    );
  }
  logout() {
    this.removeSession();
    this.router.navigate(['/']);
    // return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.users.logout}`);
  }
  changePassword(reqObj: any) {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.users.changepassword}`, reqObj);
  }
  addSession(token, refreshToken) {
    this.accessToken = token;
    this.refreshToken = refreshToken;
  }
  removeSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("organization");
    localStorage.removeItem('data');
  }
  getToken(): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.users.refreshToken}`, { params: { refreshToken: this.refreshToken } }).pipe(
      switchMap((response: any) => {
        console.log(response)
        this.addSession(response.response.Authorization, response.response.REFRESH_TOKEN)
        return of(response)
      })
    );
  }
  getMenu(): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.users.menu}`, { params: { roleId: this.userData.roles.roleId } });
  }
  allUsers(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.users.read}`, { params: params });
  }
  addUser(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.users.create}`, body);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.users.delete}${id}`);
  }
  // Organizations
  allOrgs(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.organization.read}`, { params: params });
  }
  singleOrg(id: any): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.organization.single}${id}`);
  }
  createOrg(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.organization.create}`, body);
  }
  validator(secret: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.organization.validator}/${secret}`, null);
  }
  deleteOrg(id: any): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.organization.delete}${id}`);
  }
  // Categories
  allCategories(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.categories.read}`, { params: params });
  }
  createCategory(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.categories.create}`, body);
  }
  deleteCategory(id: any, params): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.categories.delete}${id}`, { params: params });
  }
  // Whitelist
  allWhitelist(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.whitelist.read}`, { params: params });
  }
  createWhitelist(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.whitelist.create}`, body);
  }
  deleteWhitelist(id: any, oid: any): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.whitelist.delete}${id}`);
  }
  // Themes
  allThemes(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.themes.read}`, { params: params });
  }
  addTheme(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.themes.create}`, body);
  }
  deleteTheme(id: any, oid: any): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.themes.delete}${id}`);
  }
  //  Faqs
  allFaqs(params): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.faqs.read}`, { params: params });
  }

  addFaq(body: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.faqs.create}`, body);
  }

  deleteFaq(params): Observable<any> {
    return this.http.delete(`${environment.baseurl}${environment.api}${environment.endpoints.faqs.delete}`, { params: params });
  }

  isSuperAdmin() {
    return this.userData?.roles?.roleId === SUPERADMIN
  }
  isAdmin() {
    return this.userData?.roles?.roleId === ADMIN
  }

  //Templates
  allTemplates(): Observable<any> {
    return this.http.get(`http://192.168.92.113:4443/v1/whatsapp/template/list`);
  }

  addTemplate(body: any): Observable<any> {
    return this.http.post(`http://192.168.92.113:4443/v1/whatsapp/template/create`, body);
  }

  deleteTemplate(id: any): Observable<any> {
    return this.http.delete(`http://192.168.92.113:4443/v1/whatsapp/template/delete/${id}`);
  }


  // Publish
  publish(id: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.publish.publishOrg}${id}`, {})
  }

  //Un Publish
  unPublish(id: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.publish.UnPublishOrg}${id}`, {})
  }

  // chats
  getChatList(id: any){
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.chat.chatList}${id}`)
  }

  signedInRedirect(data) {

    if (data) {
      this.router.navigate(['/superadmin'])
    } else{
      this.router.navigate(['/sign-in'])
    }

    // if (this.isSuperAdmin()) {
      // this.router.navigate(['/superadmin'])
    // }
    // if (this.isAdmin()) {
    //   this.router.navigate(['/admin'])
    // }
      // this.router.navigate(['/admin'])
      // this.router.navigate(['/superadmin'])
      // this.router.navigate(['/sign-in'])
  }


  getDeployementDate(sendObj: any): Observable<any> {
    return this.http.post(`${environment.baseurl}${environment.endpoints.maintainance.deployementDate}`, sendObj).pipe(
      switchMap((response: any) => of(response)));
  }
  getResp(response: any) {
    let { response: { response: results, statusCode: status1 }, statusCode: status2 } = response;
    if (status1 && status2) {
      return results;
    }
  }

}
