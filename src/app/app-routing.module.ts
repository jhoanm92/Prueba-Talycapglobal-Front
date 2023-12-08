import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementProductComponent } from './pages/management-product/management-product.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './service/guard.service';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  { path: 'product', component: ManagementProductComponent,  canActivate: [GuardService] },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'product'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
