import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsCreateComponent } from './page';

const routes: Routes = [{
  path: 'newsCreate',
  component: NewsCreateComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsCreateRoutingModule { }
