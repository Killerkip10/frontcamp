import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsDetailsRoutingModule } from './news-details-routing.module';
import { NewsDetailsComponent, NewsDetailsService } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsDetailsRoutingModule,
  ],
  providers: [
    NewsDetailsService,
  ],
  declarations: [
    NewsDetailsComponent,
  ],
})
export class NewsDetailsModule { }
