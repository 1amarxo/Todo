import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../account/services/token-storage.service';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  
  readonly baseUrl: string = environment.todoApiUrl;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  getByFolderId(folderId : string) {
    let tmp=this.httpClient.get<Array<Todo>>(`${this.baseUrl}?folderId=${folderId}`)
    console.log(tmp)
    return this.httpClient.get<Array<Todo>>(`${this.baseUrl}?folderId=${folderId}`).toPromise();
   
  }

  getByTodoId(todoId:string){
    
    let options = { responseType: 'blob' }
    return this.httpClient.get<Todo>(`${this.baseUrl}/`+todoId, {headers: options}).toPromise() ;
  }
  
  CreateTodo(folder:Todo){
    let options = { responseType: 'blob' }
    return this.httpClient.post<Todo>(`${this.baseUrl}`,folder, {headers: options}).toPromise() ;
  }
  DeleteTodo(todoId:string){
    let options = { responseType: 'blob' }
    console.log(todoId)
    return this.httpClient.delete(`${this.baseUrl}/`+todoId, {headers: options}).toPromise() ;
  }

  UpdateTodo(id:string,todo:Todo){
    return this.httpClient.put<Todo>(`${this.baseUrl}/${id}`,todo).toPromise();
  }
}
