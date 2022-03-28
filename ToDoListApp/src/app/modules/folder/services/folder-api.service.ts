import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../account/services/token-storage.service';
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {
  
  readonly baseUrl: string = environment.folderApiUrl;

  constructor(private httpClient:HttpClient,private tokenStorage:TokenStorageService) { }

  getById(id: string) {
    return this.httpClient.get<Folder>(`${this.baseUrl}/${id}`).toPromise();
  }

  getByUserId(userId : string) {
    return this.httpClient.get<Array<Folder>>(`${this.baseUrl}?userId=${userId}`).toPromise() ;
  }
  CreateFolder(folder:Folder){
    let options = { responseType: 'blob' }
    return this.httpClient.post<Folder>(`${this.baseUrl}/add`,folder, {headers: options}).toPromise() ;
  }
  DeleteFolder(folderId:string){
    let options = { responseType: 'blob' }
    return this.httpClient.delete(`${this.baseUrl}/`+folderId, {headers: options}).toPromise() ;
  }
}
