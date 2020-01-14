import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PATH } from 'src/app/configs/path';

const routes: Routes = [{
  path: '',
  redirectTo: PATH.NEWS_LIST,
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
