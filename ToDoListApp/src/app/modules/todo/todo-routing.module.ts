import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { CurrentComponent } from "../folder/components/current/current.component";
import { TodoCurrentItemComponent } from "./components/todo-item/todo-item.component";


const routes: Routes = [
  {path: ':id', component: TodoCurrentItemComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
