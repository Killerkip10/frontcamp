import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent, LoginOtherComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
    LoginOtherComponent,
  ],
})
export class LoginModule { }
