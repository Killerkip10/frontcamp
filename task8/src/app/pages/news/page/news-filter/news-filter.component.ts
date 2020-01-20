import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { NEWS_TYPE_OPTIONS } from './constants';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFilterComponent {
  @Output() public newsTypeChange = new EventEmitter<number>();
  @Output() public newsTitleChange = new EventEmitter<string>();
  @Output() public createdByMeChange = new EventEmitter<boolean>();

  public NEWS_TYPE_OPTIONS = NEWS_TYPE_OPTIONS;

  public onNewsTypeChange(event): void {
    this.newsTypeChange.emit(Number(event.target.value));
  }

  public onNewsTitleChange(event): void {
    this.newsTitleChange.emit(event.target.value);
  }

  public onCreateByMeChange(event): void {
    this.createdByMeChange.emit(event.target.checked);
  }
}
