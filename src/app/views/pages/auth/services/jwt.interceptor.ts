import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localstorageToken: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIUrl = request.url.startsWith(environment.api);
      
    if (token && isAPIUrl) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    console.log(request )
    return next.handle(request);
  }
}