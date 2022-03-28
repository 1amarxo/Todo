import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public get accessToken() : string {
    return localStorage.getItem('accessToken') as string;
  }

  public set accessToken(token : string) {
    localStorage.setItem('accessToken', token);
  }

  public removeToken() {
    localStorage.removeItem('accessToken');
  }
  public get userName() : string {
    return localStorage.getItem('userName') as string;
  }

  public set userName(token : string) {
    localStorage.setItem('userName', token);
  }

  public get userId() : string {
    return localStorage.getItem('userId') as string;
  }

  public set userId(token : string) {
    console.log(token);
    localStorage.setItem('userId', token);
  }
  public removeUserId() {
    localStorage.removeItem('userId');
  }
  public removeUserName() {
    localStorage.removeItem('userName');
  }

}
