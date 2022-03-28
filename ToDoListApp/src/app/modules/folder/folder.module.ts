import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { CurrentComponent } from './components/current/current.component';
import { FolderRoutingModule } from './folder-routing.module';
import { ItemComponent } from './components/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { DeleteComponent } from './components/delete/delete.component';
import { DatePipePipe } from './pipes/date-pipe.pipe';
import { CreateTodoComponent } from '../todo/components/create-todo/create-todo.component';
import { TodoCurrentItemComponent } from '../todo/components/todo-item/todo-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { ContextmenuComponent } from './components/contextmenu/contextmenu.component';
import { UpdateComponent } from '../todo/components/update/update.component';
import { FolderContextmenuComponent } from './components/folder-contextmenu/folder-contextmenu.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    CurrentComponent,
    ItemComponent,
    TodoItemComponent,
    CreateTodoComponent,
    DeleteComponent,
    DatePipePipe,
    ContextmenuComponent,
    UpdateComponent,
    FolderContextmenuComponent
    
  ],
  imports: [
    CommonModule,
    FolderRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class FolderModule { }
