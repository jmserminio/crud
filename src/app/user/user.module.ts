import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserViewComponent } from './user-view/user-view.component';


@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailsComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    UserFormComponent,
    UserDetailsComponent
  ]
})
export class UserModule { }
