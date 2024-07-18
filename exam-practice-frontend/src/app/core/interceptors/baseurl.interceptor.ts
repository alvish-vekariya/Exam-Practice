import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseurlInterceptor implements HttpInterceptor {

  constructor() {}
  base_url = 'http://localhost:3000';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const cloneRequest = request.clone({
      url : this.base_url + request.url
    })

    return next.handle(cloneRequest);
  }
}
