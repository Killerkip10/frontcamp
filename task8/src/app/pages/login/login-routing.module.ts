import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from 'src/app/configs/path';

import { LoginComponent } from './page';

const routes: Routes = [{
  path: PATH.LOGIN,
  component: LoginComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
