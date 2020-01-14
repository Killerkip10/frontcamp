import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from 'src/app/configs/path';

import { NewsEditComponent } from './page';

const routes: Routes = [{
  path: PATH.NEWS_EDIT,
  component: NewsEditComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsEditRoutingModule { }
