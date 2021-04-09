import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilities } from '../common/utilities';
import { AppVariables } from '../common/app-variables';

@Injectable()
export class ApiLandmarksInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'X-Parse-Application-Id': `landMarksAppId`
      }
    });
    if (AppVariables.userSessionToken !== '') {
      request = request.clone({
        setHeaders: {
          'X-Parse-Session-Token': AppVariables.userSessionToken
        }
      });
    }
    return next.handle(request);
  }
}
