import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private ls : LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.ls.local && this.ls.token){
      const modifiedRequest = request.clone({
        setHeaders : {
          authorization : `Bearer ${this.ls.token}`
        }
      })
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
