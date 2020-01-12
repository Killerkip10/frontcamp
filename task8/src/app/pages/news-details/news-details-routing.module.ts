import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsDetailsComponent } from './page';

const routes: Routes = [{
  path: 'newsDetails',
  component: NewsDetailsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsDetailsRoutingModule { }
