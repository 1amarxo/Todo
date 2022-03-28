import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './shared/components/error/error.component';


const routes: Routes = [
  {path: '', redirectTo: '/account/login', pathMatch: 'full'},
  {path: 'folder', loadChildren: () => import('./modules/folder/folder.module').then(m=>m.FolderModule)},
  {path: 'todo', loadChildren: () => import('./modules/todo/todo.module').then(m=>m.TodoModule)},
  {path: 'account', loadChildren: () => import('./modules/account/account.module').then(m=>m.AccountModule)},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
