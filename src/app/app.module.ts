import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagementProductComponent } from './pages/management-product/management-product.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';
import { ProductDialogComponent } from './pages/product-dialog/product-dialog.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { DialogConfirmationComponent } from './shared/dialog-confirmation/dialog-confirmation.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    ManagementProductComponent,
    ProductDialogComponent,
    LoginComponent,
    DialogConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/oauth/token`],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
