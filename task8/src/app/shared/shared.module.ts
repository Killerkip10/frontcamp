import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsCreationFormComponent } from './components';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NewsCreationFormComponent,
  ],
  exports: [
    NewsCreationFormComponent,
  ]
})
export class SharedModule { }
