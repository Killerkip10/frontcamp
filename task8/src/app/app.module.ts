import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginModule,
  NewsModule,
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
    BrowserAnimationsModule,

    LoginModule,
    NewsModule,
    NewsEditModule,
    NewsCreateModule,
    NewsDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
