import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent, NewsService, NewsFilterComponent, NewsListComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

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
