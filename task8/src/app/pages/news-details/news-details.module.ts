import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { NewsDetailsRoutingModule } from './news-details-routing.module';
import { NewsDetailsComponent, NewsDetailsService } from './page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

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
