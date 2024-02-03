import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuardGuard } from './user-guard.guard';
import { FlujosComponent } from './content/flujos/flujos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'administrador',component:FlujosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
