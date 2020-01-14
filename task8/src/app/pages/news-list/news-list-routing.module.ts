import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from 'src/app/configs/path';

import { NewsListComponent } from './page';

const routes: Routes = [{
    path: PATH.NEWS_LIST,
    component: NewsListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListRoutingModule { }
