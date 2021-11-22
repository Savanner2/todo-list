import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {path: '', component: TasksListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
