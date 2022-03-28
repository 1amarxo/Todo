import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Todo } from 'src/app/modules/todo/models/todo';
import { TodoApiService } from 'src/app/modules/todo/services/todo-api.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent  {
  @Output() showCreate : EventEmitter<void> = new EventEmitter<void>();

  @Output() create=false;
  @Output() todos : Todo[] = [];
  
  @Output() todo!: Todo;
  @Output() folderId : string = "";
  @Output() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    todo: []
  };



  constructor(private folderService : FolderApiService, 
              private tokenStorage : TokenStorageService, 
              private routeService: ActivatedRoute,
              private todoService : TodoApiService,
              private router : Router) { }

  async ngOnInit() {
   this.folderId = this.routeService.snapshot.paramMap.get('id') as string;
   this.folder = await this.folderService.getById(this.folderId) as Folder;
   this.todos = await this.todoService.getByFolderId(this.folderId) as Array<Todo>
   console.log(this.todos)
  }  
  async OnCreateClicked() {
    this.create = true;
  } 

  async OnCreation(bool : boolean) {
    this.create = false;
    if(bool) { 
      this.todos = await this.todoService.getByFolderId(this.folderId) as Array<Todo>;
      console.log(this.todo)
    }
  }

  async OnBackClicked(){
    this.router.navigate(['/folder/list']);
  }


}
