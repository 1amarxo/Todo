import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoRoutingModule } from './todo-routing.module';
import { CurrentTodoComponent } from './components/current-todo/current-todo.component';
import { TodoCurrentItemComponent } from './components/todo-item/todo-item.component';


@NgModule({
  declarations: [
    CurrentTodoComponent,TodoCurrentItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
