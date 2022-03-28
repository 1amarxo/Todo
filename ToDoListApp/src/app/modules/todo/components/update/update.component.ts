import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Todo } from '../../models/todo';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @Output() closeUpdate : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() todo : Todo = {
    id:'',
    discription:'',
    isDone:false,
    name:'',
    date:new Date(),
    priority:0,
    folderId:'',
    tagId:Array<string>()
  };

  updateForm: FormGroup;

  
  get name() { return this.updateForm.get('name'); }
  get discription() { return this.updateForm.get('discription'); }
  get date() { return this.updateForm.get('date')}
  get priority() { return this.updateForm.get('priority'); }
  
  constructor(private todoService: TodoApiService,
             private router: Router, 
             private tokenStorage : TokenStorageService) {
    this.updateForm = new FormGroup({
      name: new FormControl(null,  [Validators.required]),
      discription: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.name?.setValue(this.todo.name);
    this.discription?.setValue(this.todo.discription);
    this.date?.setValue(this.todo.date);
    this.priority?.setValue(this.todo.priority);
  }

  async OnSubmit(): Promise<void> {
    
    let tagArray: Array<string> = ["EA62A3E7-CE3E-471B-9C59-05D40A3F3458"];

    this.updateForm.value['id'] = this.todo.id;
    
    this.updateForm.value['folderId'] = this.todo.folderId;
    
    this.updateForm.value['isDone'] = false;
    
    this.updateForm.value['tagId'] =tagArray;

    await this.todoService.UpdateTodo(this.updateForm.value['id'],this.updateForm.value);
    
    window.location.reload();
    this.OnClick(true);
    
  }

  async OnClick(bool : boolean = false) {
    if(bool) this.closeUpdate.emit(true);
    else this.closeUpdate.emit(false);
  }


}
