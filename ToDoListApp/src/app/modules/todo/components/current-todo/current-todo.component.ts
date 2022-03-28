import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-current-todo',
  templateUrl: './current-todo.component.html',
  styleUrls: ['./current-todo.component.scss']
})
export class CurrentTodoComponent {

   sliceOptions = {
    end: 30,
    start: 0,
    default: 100
  };

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

  expand:boolean=false;
  constructor(private router:Router) { }

  onExpandText(evt:any): void{ 
    if(this.expand==true){

      this.sliceOptions.end = this.sliceOptions.end?
      this.todo.discription.length:this.sliceOptions.default;
      this.expand=false;
    }
    else{
      this.sliceOptions.end = this.sliceOptions.end?
      30:this.sliceOptions.default;
      this.expand=true;
    }
 
   }

   async OnBackClicked(){
     this.router.navigate([`/folder/detail/${this.todo.folderId}`]);
  }

}
