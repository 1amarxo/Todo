import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { Todo } from 'src/app/modules/todo/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{



  @Output() showCreate : EventEmitter<void> = new EventEmitter<void>();

  @Output() create=false;
  @Output() todoOut!: Todo;
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
  
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  constructor(private router : Router) { }



  ngOnInit(): void {
 
  }

  OnClick():void{
    console.log(this.todo.id)
    this.router.navigate([`/todo/${this.todo.id}`]);
  }

  async OnCreation(bool : boolean) {
    this.create = false;
  }
  
  onRightClick(event:any,todo:Todo) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.todoOut=todo;
    this.contextmenu = true;
    event.preventDefault()
  }
  clickedOutsideMenu() {
    this.disableContextMenu();
 }
  disableContextMenu() {
    this.contextmenu = false;
  }
}
