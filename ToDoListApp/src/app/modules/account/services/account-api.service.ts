import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AccountCredential } from '../models/account-credentials';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private readonly apiUrl:string = environment.accountApiUrl;

  constructor(private httpClient: HttpClient) { }

  login(credential: AccountCredential){
    let options = { responseType: 'blob' }
    credential.userName = 'default';
    
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, credential, {headers: options}).toPromise() as Promise<AuthResponse>;
  }

  register(credential : AccountCredential){
    let options = {responseType:'blob'};
    return this.httpClient.post<string>(`${this.apiUrl}/register`, credential, {headers: options}).toPromise() as Promise<void>;
  }
}
