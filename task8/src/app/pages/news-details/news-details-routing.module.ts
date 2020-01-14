import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from 'src/app/configs/path';

import { NewsDetailsComponent } from './page';

const routes: Routes = [{
  path: PATH.NEWS_DETAILS,
  component: NewsDetailsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsDetailsRoutingModule { }
