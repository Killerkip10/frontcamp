import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from 'src/app/configs/path';

import { NewsCreateComponent } from './page';

const routes: Routes = [{
  path: PATH.NEWS_CREATE,
  component: NewsCreateComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsCreateRoutingModule { }
