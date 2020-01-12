import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsListRoutingModule } from './news-list-routing.module';
import { NewsListComponent, NewsListService } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsListRoutingModule,
  ],
  providers: [
    NewsListService,
  ],
  declarations: [
    NewsListComponent,
  ],
})
export class NewsListModule { }
