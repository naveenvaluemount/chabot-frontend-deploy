import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, take, BehaviorSubject, filter } from 'rxjs';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshToken: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private api: ApiService, private snackbar: MatSnackBar) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.api.accessToken) {
      request = this.addToken(request, this.api.accessToken);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 406) {
          return this.handle401Error(request, next);
        } else {
        
            switch (error.status) {
                case 400:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Bad Request!',null, { duration: 3000, panelClass:'snackbar-error' });
                    break;
                case 401:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Retry login after a while!',null, { duration: 3000, panelClass:'snackbar-error' });
                    // this.api.logout();
                    break;
                case 403:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Acess Denied!',null, { duration: 3000, panelClass:'snackbar-error' });
                    break;
                case 404:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Requested resource does not exist!',null, { duration: 3000, panelClass:'snackbar-error' });
                    break;
                case 412:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Precondition Failed!',null, { duration: 3000, panelClass:'snackbar-error' });
                    break;
                case 500:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Internal Server Error!',null, { duration: 3000, panelClass:'snackbar-error' });
                    break;
                default:
                    this.snackbar.open(error.error.errorMsg ? error.error.errorMsg : 'Something went wrong!',null, { duration: 3000, panelClass:'snackbar-error' });

            }
          return throwError(error);
        }
      })
    );
  }
  addToken(request: HttpRequest<any>, token) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshToken) {
      this.refreshToken = true;
      this.refreshTokenSubject.next(null);
      return this.api.getToken().pipe(take(1)).pipe(
        switchMap((response) => {
          this.refreshToken = false;
          this.refreshTokenSubject.next(response.response.Authorization);
          return next.handle(
            this.addToken(request, response.response.Authorization)
          );
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
