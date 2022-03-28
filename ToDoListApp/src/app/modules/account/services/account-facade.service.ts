import { Injectable } from '@angular/core';
import { AccountCredential } from '../models/account-credentials';
import { AuthResponse } from '../models/auth-response';
import { AccountApiService } from './account-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountFacadeService {
  
  constructor(private accountApi: AccountApiService, private tokenStorage: TokenStorageService) { }

  userName : string = '';

  isAuthenticated(): Boolean {
    if(this.tokenStorage.accessToken) {
      this.userName = this.tokenStorage.userName; 
      return true;
    }
    return false;
  }
  async register(credential: AccountCredential) {
    await this.accountApi.register(credential);
  }

  async login(credential: AccountCredential) {
    let token = await this.accountApi.login(credential) ;

    this.tokenStorage.accessToken = token.token;
    this.tokenStorage.userName = token.username;
    this.tokenStorage.userId=token.id ;
  }

  logout() {
    this.tokenStorage.removeToken();
  }
  
}
