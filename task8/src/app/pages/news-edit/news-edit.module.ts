import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { NewsEditRoutingModule } from './news-edit-routing.module';
import { NewsEditComponent, NewsEditService } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsEditRoutingModule,
    SharedModule,
  ],
  providers: [
    NewsEditService,
  ],
  declarations: [
    NewsEditComponent,
  ],
})
export class NewsEditModule { }
