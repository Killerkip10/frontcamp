import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsEditComponent } from './page';

const routes: Routes = [{
  path: 'newsEdit',
  component: NewsEditComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsEditRoutingModule { }
