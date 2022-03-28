import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  
  constructor(private tokenStorage: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestWithToken = this.addAccessToken(request);
    return next.handle(requestWithToken);
  }

  addAccessToken(request: HttpRequest<any>) : HttpRequest<any> {
    if (this.tokenStorage.accessToken)
      return request.clone({setHeaders: { 'Authorization': `Bearer ${this.tokenStorage.accessToken}` }});
    else
      return request;
  }
}
