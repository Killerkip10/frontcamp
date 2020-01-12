import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NewsListModule,
  NewsEditModule,
  NewsCreateModule,
  NewsDetailsModule,
} from './pages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,

    NewsListModule,
    NewsEditModule,
    NewsCreateModule,
    NewsDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
