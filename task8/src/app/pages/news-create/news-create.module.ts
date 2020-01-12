import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsCreateRoutingModule } from './news-create-routing.module';
import { NewsCreateComponent } from './page';

@NgModule({
  imports: [
    CommonModule,

    NewsCreateRoutingModule,
  ],
  declarations: [
    NewsCreateComponent,
  ],
})
export class NewsCreateModule { }
