import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { INews, requiredTrimmedTextValidator } from 'src/app/core';

import { FORM_FIELDS } from './constants';

@Component({
  selector: 'app-news-creation',
  templateUrl: './news-creation-form.component.html',
})
export class NewsCreationFormComponent {
  @Input() public news: INews;
  @Output() public save = new EventEmitter<INews>();

  public FORM_FIELDS = FORM_FIELDS;

  public formGroup = this.fb.group({
    [FORM_FIELDS.TITLE]: ['', requiredTrimmedTextValidator],
    [FORM_FIELDS.DESCRIPTION]: ['', requiredTrimmedTextValidator],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  public onSaveClick(): void {
    this.save.emit(this.formGroup.value);
  }
}
