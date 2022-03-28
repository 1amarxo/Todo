import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { FolderApiService } from 'src/app/modules/folder/services/folder-api.service';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {
  @Output() closeCreate : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() folderId : string = "";
  createForm: FormGroup;
  get name() { return this.createForm.get('name'); }
  get discription() { return this.createForm.get('discription'); }
  get date() { return this.createForm.get('date')}
  get priority() { return this.createForm.get('priority'); }

  tagArray: Array<string> = ['6FB8EFBB-CA6D-44C3-BDF5-6FB7D95FC384'];

  constructor(private todoService: TodoApiService,
             private router: Router, 
             private tokenStorage : TokenStorageService) {
    this.createForm = new FormGroup({
      name: new FormControl(null,  [Validators.required]),
      discription: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      tagId:new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)])
    })
  }

  async OnSubmit(): Promise<void> {
    
    
    this.createForm.value['isDone'] = false;
    this.createForm.value['folderId'] = this.folderId;
    this.createForm.value['tagId'] =this.tagArray;
    this.createForm.value['tagId'][0].replace(/\s/g, "");
    await this.todoService.CreateTodo(this.createForm.value);
    this.OnClick(true);
  }

  async OnClick(bool : boolean = false) {
    if(bool) this.closeCreate.emit(true);
    else this.closeCreate.emit(false);
  }
}
