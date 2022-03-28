import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/modules/todo/models/todo';
import { TodoApiService } from 'src/app/modules/todo/services/todo-api.service';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {

  @Output() update : boolean = false;
  @Input() x=0;
  @Input() y=0;
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

  constructor(public todoService:TodoApiService, private router : Router) { }

  ngOnInit(): void {
    console.log(this.todo)
  }

  async onDeleteClick(){
    console.log(this.todo)
    await this.todoService.DeleteTodo(this.todo.id);
    window.location.reload();
  }
  async OnEditClicked(){
    this.update=true;
  }
  async OnUpdate(bool : boolean){
    this.update=false;
  }
}
