import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { NewsCreateRoutingModule } from './news-create-routing.module';
import { NewsCreateComponent, NewsCreateService } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsCreateRoutingModule,
    SharedModule,
  ],
  providers: [
    NewsCreateService,
  ],
  declarations: [
    NewsCreateComponent,
  ],
})
export class NewsCreateModule { }
