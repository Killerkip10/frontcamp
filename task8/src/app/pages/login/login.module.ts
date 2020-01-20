import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
