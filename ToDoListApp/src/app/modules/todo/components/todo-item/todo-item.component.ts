import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoCurrentItemComponent implements OnInit {

  todo : Todo = {
    id:'',
    discription:'',
    isDone:false,
    name:'',
    date:new Date(),
    priority:0,
    folderId:'',
    tagId:Array<string>()
  };

  todoId:string='';
  constructor(private todoService : TodoApiService, private routeService: ActivatedRoute, private router : Router) { }

  async ngOnInit() {
    this.todoId=this.routeService.snapshot.paramMap.get('id') as string;

    try{
      this.todo= await this.todoService.getByTodoId(this.todoId) as Todo;
    }
    catch{
      this.router.navigate(["/error"]);
    }
  }

}
