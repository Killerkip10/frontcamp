import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent, NewsService, NewsFilterComponent, NewsListComponent } from './page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    NewsRoutingModule,
  ],
  providers: [
    NewsService,
  ],
  declarations: [
    NewsComponent,
    NewsFilterComponent,
    NewsListComponent,
  ],
})
export class NewsModule { }
