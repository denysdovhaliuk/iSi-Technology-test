import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { Error403Component } from './components/error403/error403.component';
import { Error404Component } from './components/error404/error404.component';
import { PasswordValidatorDirective } from './directives/password-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    Error403Component,
    Error404Component,
    PasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
