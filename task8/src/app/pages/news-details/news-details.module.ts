import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsDetailsRoutingModule } from './news-details-routing.module';
import { NewsDetailsComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsDetailsRoutingModule,
  ],
  declarations: [
    NewsDetailsComponent,
  ],
})
export class NewsDetailsModule { }
