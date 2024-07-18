import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthLayoutComponent } from './authentication/auth-layout/auth-layout.component';
import { loginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    loadChildren : ()=>import('./pages/pages.module').then((m)=>m.PagesModule),
    canActivate : [loginGuard]
  },
  {
    path : 'auth',
    component : AuthLayoutComponent,
    loadChildren : ()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
