import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsEditRoutingModule } from './news-edit-routing.module';
import { NewsEditComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsEditRoutingModule,
  ],
  declarations: [
    NewsEditComponent,
  ],
})
export class NewsEditModule { }
