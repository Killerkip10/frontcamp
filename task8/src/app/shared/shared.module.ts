import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material';
import { NewsCreationFormComponent, LoaderComponent } from './components';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  declarations: [
    NewsCreationFormComponent,
    LoaderComponent,
  ],
  exports: [
    MaterialModule,

    NewsCreationFormComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
