import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FotoInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Richiesta dal Foto Interceptor', request);

    return next.handle(request).pipe(tap(newRequest => {
      console.log('RIchiesta dal Foto Interceptor', newRequest);

    }))
  }
}
